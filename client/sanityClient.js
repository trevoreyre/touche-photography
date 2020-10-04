const SanityClient = require('@sanity/client')

module.exports = SanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})
