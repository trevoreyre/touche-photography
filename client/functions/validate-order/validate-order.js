const SanityClient = require('@sanity/client')

const sanity = SanityClient({
  projectId: 'nivdog3o',
  dataset: 'test',
  useCdn: true,
})

const PHOTO_QUERY = `
  *[_type == 'photo' && _id == $photoId][0] { _id, title }
`

const PURCHASE_OPTION_QUERY = `
  *[_id == 'global-config'][0] {
    'option': purchaseOptions[_key == $optionKey][0] {
      _key,
      material,
      'size': sizes[_key == $sizeKey][0] {
        _key,
        price
      }
    },
  }
`

const QUERY = `{
  'photo': ${PHOTO_QUERY},
  'purchaseOption': ${PURCHASE_OPTION_QUERY}
}`

exports.handler = (event, context, callback) => {
  // Snipcart sends a GET request when crawling products
  if (event.httpMethod !== 'GET') {
    return callback(null, {
      statusCode: 400,
      body: '',
    })
  }

  const { id } = event.queryStringParameters
  const [photoId, optionKey, sizeKey] = id.split('|')

  sanity
    .fetch(QUERY, { photoId, optionKey, sizeKey })
    .then(({ photo, purchaseOption }) => {
      const { option } = purchaseOption

      return callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `${photo._id}|${option._key}|${option.size._key}`,
          price: option.size.price,
          url: `https://dev.touchephotography.com/.netlify/functions/validate-order?id=${id}`,
        }),
      })
    })
}
