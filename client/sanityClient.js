const SanityClient = require('@sanity/client')

module.exports = SanityClient({
  projectId: 'nivdog3o',
  dataset: 'test',
  useCdn: true,
})
