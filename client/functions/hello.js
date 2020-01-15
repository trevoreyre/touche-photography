exports.handler = (event, context, callback) => {
  const subject = event.queryStringParameters.name || 'World'
  return callback(null, {
    statusCode: 200,
    body: `Hello ${subject}!`,
  })
}
