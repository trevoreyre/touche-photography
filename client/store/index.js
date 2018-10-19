import Vuex from 'vuex'

import sanity from "~/sanity";

const photosQuery = `
  *[_type == 'photo'] {
    _id,
    title,
    "slug": slug.current,
    tags,
    'image': image.asset-> {
      url,
      'width': metadata.dimensions.width,
      'height': metadata.dimensions.height,
      'palette': metadata.palette,
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
      config: {}
    },
    mutations: {
      setPhotos (state, photos) {
        state.photos = photos
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

        const photosWithMetadata = photos.map(photo => ({
          ...photo,
          image: {
            ...photo.image,
            aspectRatio: photo.image.height / photo.image.width
          },
          purchaseOptions: config.purchaseOptions
        }))
        config['baseUrl'] = 'https://dev.touchephotography.com'

        await commit('setPhotos', photosWithMetadata)
        await commit('setConfig', config)
      }
    }
  })
}

export default createStore
