import Vuex from 'vuex'

import sanity from "~/sanity";

const photosQuery = `
  *[_type == 'photo'] {
    _id,
    title,
    slug,
    tags
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
        // console.log('nuxtServerInit', config, photos)
        const photosWithPurchaseOptions = photos.map(photo => ({
          ...photo,
          purchaseOptions: config.purchaseOptions
        }))
        // console.log('photosWithPurchaseOptions', photosWithPurchaseOptions);
        await commit('setPhotos', photosWithPurchaseOptions)
        await commit('setConfig', config)
      }
    }
  })
}

export default createStore
