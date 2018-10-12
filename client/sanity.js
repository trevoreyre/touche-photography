const sanityClient = require('@sanity/client')

module.exports = sanityClient({
  projectId: 'nivdog3o',
  dataset: 'test',
  useCdn: true
})
