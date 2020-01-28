const util = require('util')
const Mailgun = require('mailgun-js')

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

exports.handler = (event, context, callback) => {
  console.log(util.inspect(event, false, null, true))
  const { eventName, content } = event
  if (eventName === 'order.completed') {
    const text = `
      There was a new order on Touché!

      ${content.items
        .map(
          ({ name, description, price }) => `${name}, ${description}. $${price}`
        )
        .join('\n')}
    `
    mailgun.messages().send(
      {
        from: `Touché <orders@${process.env.MAILGUN_DOMAIN}>`,
        to: 'trevoreyre@gmail.com',
        subject: 'New order on Touché',
        text,
      },
      (error, body) => {
        callback(null, {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      }
    )
  }
}
