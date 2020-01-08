import path from 'path'
import sanityClient from './sanity'

const appSrc = path.join(__dirname, 'src')

export default {
  mode: 'spa',
  head: {
    title: 'Touché Photography',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    // Snipcart styling. JavaScript file is included in default layout.
    link: [
      {
        href: 'https://cdn.snipcart.com/themes/v3.0.3/default/snipcart.css',
        type: 'text/css',
        rel: 'stylesheet'
      }
    ],
  },
  // Extend vue-router so URL params are available to components as props
  router: {
    extendRoutes(routes) {
      routes.forEach(route => {
        route.props = true
      })
    }
  },
  css: [
    '@slate-ui/core/style.css'
  ],
  build: {
    cache: true,
    babel: {
      babelrc: false,
      cacheDirectory: undefined,
      presets: ['@nuxt/babel-preset-app'],
      sourceType: 'unambiguous'
    },
    loaders: {
      cssModules: {
        localsConvention: 'camelCaseOnly'
      },
    },
    extend(config) {
      config.resolve.alias['styles'] = path.join(appSrc, 'styles')

      // TODO: I think this had something to do with getting @trevoreyre/ui CSS working
      // if (isServer) {
      //   for (const rules of config.module.rules.filter(({ test }) =>
      //     /\.css/.test(test.toString())
      //   )) {
      //     for (const rule of rules.oneOf || []) {
      //       rule.use = rule.use.filter(
      //         ({ loader }) => loader !== 'cache-loader'
      //       )
      //     }
      //   }
      // }
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
  plugins: [
    '~/plugins/components',
    { src: '~/plugins/nuxtClientInit', ssr: false }
  ]
}
