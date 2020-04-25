const util = require('util')
const SanityClient = require('@sanity/client')

const sanityClient = SanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})

const SHIPPING_METHODS_QUERY = `
  *[_type == 'shippingMethod' && product._ref == $productId]
`
// && $sizeKey in rates[].sizes

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  // console.log(util.inspect(body, false, null, true))

  const { eventName, content } = body
  if (eventName !== 'shippingrates.fetch') {
    return callback(null, {
      statusCode: 400,
      body: 'Invalid event',
    })
  }

  const { items } = content
  const shippingMethodResponses = await Promise.all(
    content.items.map((item) => {
      const { productId, sizeKey } = item.metadata
      console.log('productId:', productId)
      return sanityClient.fetch(SHIPPING_METHODS_QUERY, { productId, sizeKey })
    })
  )

  const ratesByItem = items.map((item, index) => {
    const { sizeKey } = item.metadata
    return shippingMethodResponses[index].map((shippingMethod) => {
      console.log(
        'shippingMethod',
        util.inspect(shippingMethod, false, null, true)
      )
      const [rate] = shippingMethod.rates.filter((rate) =>
        rate.sizes.includes(sizeKey)
      )
      return {
        description: shippingMethod.name,
        guaranteedDaysToDelivery: shippingMethod.deliveryTime,
        cost: rate.rate * item.quantity,
      }
    })
  })
  console.log('ratesByItem', util.inspect(ratesByItem, false, null, true))

  const rates = ratesByItem.reduce((rates, itemRates) => {
    itemRates.forEach((rate) => {
      if (rates[rate.description]) {
        rates[rate.description].cost += rate.cost
      } else {
        rates[rate.description] = rate
      }
    })
    return rates
  }, {})
  console.log('rates', util.inspect(rates, false, null, true))

  return callback(null, {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rates: Object.values(rates),
    }),
  })
  {
  }
}
