const util = require('util')
const SanityClient = require('@sanity/client')

const sanityClient = SanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  console.log(util.inspect(body, false, null, true))

  const { eventName, content } = body
  if (eventName !== 'shippingrates.fetch') {
    return callback(null, {
      statusCode: 400,
      body: 'Invalid event',
    })
  }

  const { items } = content

  return callback(null, {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rates: [
        {
          cost: 10,
          description: 'Ground shipping',
        },
        {
          cost: 20,
          description: 'Two day shipping',
          guaranteedDaysToDelivery: 2,
        },
        {
          cost: 30,
          description: 'Overnight shipping',
          guaranteedDaysToDelivery: 1,
        },
      ],
    }),
  })
  {
  }
}
