const stripe = require('stripe')(process.env.STRIPE_API_KEY)

exports.handler = async ({ queryStringParameters }) => {
  const { sessionId } = queryStringParameters
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  }
}
