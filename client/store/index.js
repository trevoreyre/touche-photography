import sanity from "~/sanity";
import Fuse from 'fuse.js'

// TODO: Test data
// import photosResponse from '../test-util/photos.json'
// import configResponse from '../test-util/config.json'

// sanity.fetch = query => new Promise((resolve, reject) => {
//   if (/.*type == 'photo'.*/g.test(query)) return resolve(photosResponse.result)
//   if (/.*id == 'global-config'.*/g.test(query)) return resolve(configResponse.result)
//   return reject('Unknown query')
// })

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

const searchOptions = {
  shouldSort: true,
  threshold: 0.3,
  keys: ['tags']
}

const state = () => ({
  initialized: false,
  config: {},
  fuse: null,
  photos: [],
  search: () => {},
  tags: [],
})

const mutations = {
  setInitialized(state) {
    state.initialized = true
  },
  setConfig(state, config) {
    state.config = config
  },
  setFuse(state, fuse) {
    state.fuse = fuse
  },
  setPhotos(state, photos) {
    state.photos = photos
  },
  setSearch(state, search) {
    state.search = search
  },
  setTags(state, tags) {
    state.tags = tags
  },
}

const actions = {
  async nuxtServerInit({ commit }) {
    const [ photosResult, [ config ] ] = await Promise.all([
      sanity.fetch(photosQuery),
      sanity.fetch(configQuery)
    ])

    const photos = photosResult.map(photo => ({
      ...photo,
      image: {
        ...photo.image,
        aspectRatio: photo.image.height / photo.image.width
      },
    }))
    let tags = photos.reduce((tags, photo) => {
      return [...tags, ...photo.tags]
    }, [])
    tags = [...new Set(tags)]

    const fuse = new Fuse(photos, searchOptions)

    // TODO: Remove hard-coded baseUrl
    config['baseUrl'] = 'https://dev.touchephotography.com'

    commit('setConfig', config)
    commit('setFuse', fuse)
    commit('setPhotos', photos)
    commit('setSearch', fuse.search)
    commit('setTags', tags.map(tag => ({ tag })))
    commit('setInitialized')
  }
}

export { state, mutations, actions }
