const util = require('util')

exports.handler = (event, context, callback) => {
  console.log('get-shipping.js')
  // Snipcart sends a POST request for shipping information
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 400,
      body: '',
    })
  }

  const body = JSON.parse(event.body)
  console.log(util.inspect(body, false, null, true))

  const { eventName, content } = body
  if (eventName !== 'shippingrates.fetch') {
    return callback(null, {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Invalid eventName',
      }),
    })
  }

  return callback(null, {
    statusCode: 404,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: 'Invalid eventName',
    }),
  })
}
