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

const state = () => ({
  initialized: false,
  photos: [],
  tags: [],
  config: {}
})

const mutations = {
  setInitialized(state) {
    state.initialized = true
  },
  setPhotos(state, photos) {
    state.photos = photos
  },
  setTags(state, tags) {
    state.tags = tags
  },
  setConfig(state, config) {
    state.config = config
  }
}

const actions = {
  async nuxtServerInit({ commit }) {
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

    commit('setPhotos', photosWithMetadata)
    commit('setTags', Object.keys(tags).map(tag => ({ tag: tag })))
    commit('setConfig', config)
    commit('setInitialized')
  }
}

export { state, mutations, actions }
