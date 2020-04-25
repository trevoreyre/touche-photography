const SanityClient = require('@sanity/client')

const sanityClient = SanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})

const PHOTO_QUERY = `
  *[_type == 'photo' && _id == $photoId][0] { _id, title }
`

const PRODUCT_QUERY = `
  *[_type == 'product && _id == $productId][0] {
    _id,
    name,
    'size': sizes[_key == $sizeKey][0] {
      _key,
      price
    }
  }
`

const QUERY = `{
  'photo': ${PHOTO_QUERY},
  'product': ${PRODUCT_QUERY}
}`

exports.handler = async (event, context, callback) => {
  console.log(event.queryStringParameters)

  // Snipcart sends a GET request when crawling products
  if (event.httpMethod !== 'GET') {
    return callback(null, {
      statusCode: 400,
      body: 'Invalid HTTP method',
    })
  }

  const { id } = event.queryStringParameters
  const [photoId, productId, sizeKey] = id.split('|')

  const { photo, product } = await sanityClient.fetch(QUERY, {
    photoId,
    productId,
    sizeKey,
  })

  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: `${photo._id}|${product._id}|${product.size._key}`,
      price: product.size.price,
      url: `https://dev.touchephotography.com/.netlify/functions/validate-order?id=${id}`,
    }),
  })
}
