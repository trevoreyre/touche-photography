const util = require('util')
const Mailgun = require('mailgun-js')

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  console.log(util.inspect(body, false, null, true))

  const { eventName, content } = body
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
  } else {
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'applications/json',
      },
      body: JSON.stringify({
        message: 'No action taken',
      }),
    })
  }
}
