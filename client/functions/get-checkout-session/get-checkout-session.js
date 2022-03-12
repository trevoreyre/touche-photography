const stripe = require('stripe')(process.env.STRIPE_API_KEY)

exports.handler = async (event, context) => {
  const { sessionId } = event.queryStringParameters
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  }
}
