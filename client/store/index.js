import Vuex from 'vuex'

import sanity from "~/sanity";

const photosQuery = `
  *[_type == 'photo'] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    tags,
    'image': image.asset-> {
      url,
      'width': metadata.dimensions.width,
      'height': metadata.dimensions.height,
      'placeholder': metadata.lqip
    }
  }
`
const configQuery = `
  *[_id == 'global-config'] {
    purchaseOptions,
    siteName
  }
`

const createStore = () => {
  return new Vuex.Store({
    state: {
      photos: [],
      tags: [],
      config: {}
    },
    mutations: {
      setPhotos (state, photos) {
        state.photos = photos
      },
      setTags (state, tags) {
        state.tags = tags
      },
      setConfig (state, config) {
        state.config = config
      }
    },
    actions: {
      async nuxtServerInit ({ commit }) {
        const [ photos, [ config ] ] = await Promise.all([
          sanity.fetch(photosQuery),
          sanity.fetch(configQuery)
        ])

        let tags = {}
        let photosWithMetadata = []

        photos.forEach(photo => {
          photosWithMetadata.push({
            ...photo,
            image: {
              ...photo.image,
              aspectRatio: photo.image.height / photo.image.width
            },
            purchaseOptions: config.purchaseOptions
          })
          photo.tags.forEach(tag => {
            tags[tag] = tag
          })
        })
        config['baseUrl'] = 'https://dev.touchephotography.com'

        await commit('setPhotos', photosWithMetadata)
        await commit('setTags', Object.keys(tags).map(tag => ({ tag: tag })))
        await commit('setConfig', config)
      }
    }
  })
}

export default createStore
