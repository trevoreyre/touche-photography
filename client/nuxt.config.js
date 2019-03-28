import path from 'path'
import sanityClient from './sanity'

const appSrc = path.join(__dirname, 'src')

export default {
  head: {
    title: 'Touché Photography',
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
  build: {
    cache: true,
    extend (config, { isServer, isDev, isClient }) {
      config.resolve.alias['styles'] = path.join(appSrc, 'styles')
      if (isServer) {
        for (const rules of config.module.rules.filter(({ test }) =>
          /\.css/.test(test.toString())
        )) {
          for (const rule of rules.oneOf || []) {
            rule.use = rule.use.filter(
              ({ loader }) => loader !== 'cache-loader'
            )
          }
        }
      }
    }
  },
  generate: {
    routes: async function () {
      const paths = await sanityClient.fetch(`
        *[_type == 'photo'].slug.current
      `)
      return paths
    }
  },
  plugins: ['~/plugins/components']
}
