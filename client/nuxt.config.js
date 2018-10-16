import sanityClient from './sanity'

export default {
  head: {
    title: 'Touché Photography Poop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      // Snipcart styling
      {
        href: "https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css",
        type: "text/css",
        rel: "stylesheet"
      }
    ],
    script: [
      // jQuery. Only needed for snipcart
      {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"
      },
      // Snipcart js
      {
        src: "https://cdn.snipcart.com/scripts/2.0/snipcart.js",
        id: "snipcart",
        "data-autopop": "false",
        "data-api-key": "ZjczZjI0ODQtNjc2NS00OGNhLWExNjQtYmJkOTAwYzIwNGU5NjM2NzQzMzk4NzkxNDIwOTEz"
      }
    ]
  },
  generate: {
    routes: async function () {
      const paths = await sanityClient.fetch(`
        *[_type == 'photo'].slug.current
      `)
      return paths
    }
  }
}
