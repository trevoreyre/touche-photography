import 'dotenv/config'
import path from 'path'
import sanityClient from './sanityClient'

const appSrc = path.join(__dirname, 'src')

export default {
  mode: 'universal',
  head: {
    title: 'Touché Photography',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#009c8d' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#009c8d' },
    ],
  },
  router: {
    // Extend vue-router so URL params are available to components as props
    extendRoutes(routes) {
      routes.forEach((route) => {
        route.props = true
      })
    },
    // TODO: Fix scroll jumping to top when navigating to same page with a query
    // scrollBehavior(to, from, savedPosition) {
    //   console.log('scrollBehavior', { to, from, savedPosition })
    //   return false
    // }
  },
  css: ['@slate-ui/core/style.css'],
  buildModules: ['@nuxtjs/dotenv'],
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
  },
  build: {
    cache: true,
    babel: {
      babelrc: false,
      cacheDirectory: undefined,
      presets: ['@nuxt/babel-preset-app'],
      sourceType: 'unambiguous',
    },
    loaders: {
      cssModules: {
        localsConvention: 'camelCaseOnly',
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
    },
  },
  generate: {
    // fallback: true,
    routes: async function () {
      const { photoSlugs, pageSlugs } = await sanityClient.fetch(`{
        'photoSlugs': *[_type == 'photo'].slug.current,
        'pageSlugs': *[_type == 'page'].slug.current,
      }`)
      const paths = [
        ...photoSlugs.map((slug) => `photos/${slug}`),
        ...pageSlugs,
      ]
      return paths
    },
  },
  plugins: [
    '~/plugins/components',
    { src: '~/plugins/nuxtClientInit', ssr: false },
  ],
}
