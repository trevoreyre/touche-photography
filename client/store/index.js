import sanity from "~/sanity";
import Fuse from 'fuse.js'

// Test data
// TODO: Update initQueryResponse.json
// import initQueryResponse from '../test-util/initQueryResponse.json'
// sanity.fetch = query => new Promise((resolve, reject) => {
//   console.log('query:', query)
//   if (query === initQuery) {
//     return resolve(initQueryResponse.result)
//   }
// })

// const initQuery = `{
//   'photos': *[_type == 'photo'] | order(_createdAt desc) {
//     'id': _id,
//     title,
//     'slug': slug.current,
//     tags,
//     'image': image.asset-> {
//       url,
//       'width': metadata.dimensions.width,
//       'height': metadata.dimensions.height,
//       'aspectRatio': metadata.dimensions.height / metadata.dimensions.width,
//       'placeholder': metadata.lqip
//     }
//   },
//   'config': *[_id == 'global-config'] {
//     purchaseOptions,
//     siteName
//   }
// }`

const initQuery = `{
  'photos': *[_type == 'photo'] | order(_createdAt desc) {
    'id': _id,
    title,
    'slug': slug.current,
    tags,
    image {
      'asset': asset->,
      ...
    }
  },
  'config': *[_id == 'global-config'] {
    purchaseOptions,
    siteName
  }
}`

const options = {
  shouldSort: true,
  threshold: 0.3,
}

const state = () => ({
  initialized: false,
  config: {},
  photos: [],
  photosIndex: null,
  tags: [],
  tagsIndex: null,
  search: () => {},
})

const getters = {
  searchTags: state => query => {
    return state.tagsIndex.search(query)
  },

  searchPhotos: state => query => {
    return state.photosIndex.search(query)
  },

  getPhoto: state => ({ id, slug }) => {
    return state.photos.find(photo => {
      if (id !== undefined) return photo.id === id
      if (slug !== undefined) return photo.slug === slug
    })
  },

  getPurchaseOption: state => key => {
    return state.config.purchaseOptions.find(option => option._key === key)
  },
}

const mutations = {
  initialize(state, { photos, config }) {
    const tags = photos.reduce((tags, photo) => {
      return [...new Set(tags.concat(photo.tags))]
    }, [])

    state.initialized = true
    state.photos = photos
    state.tags = tags
    state.config = config
    state.photosIndex = new Fuse(photos, { ...options, keys: ['tags'] })
    state.tagsIndex = new Fuse(
      tags.map(tag => ({ tag })), { ...options, keys: ['tag'] }
    )
  },
}

const actions = {
  async nuxtServerInit({ commit }) {
    const { photos, config } = await sanity.fetch(initQuery)

    // TODO: Remove hard-coded baseUrl
    config[0]['baseUrl'] = 'https://dev.touchephotography.com'
    commit({
      type: 'initialize',
      photos: photos,
      config: config[0]
    })
  }
}

export { state, getters, mutations, actions }
