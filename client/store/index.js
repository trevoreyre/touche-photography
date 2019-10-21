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

const initQuery = `{
  'photos': *[_type == 'photo'] | order(_createdAt desc) {
    'id': _id,
    title,
    'slug': slug.current,
    tags,
    'image': image.asset-> {
      url,
      'width': metadata.dimensions.width,
      'height': metadata.dimensions.height,
      'placeholder': metadata.lqip
    }
  },
  'config': *[_id == 'global-config'] {
    purchaseOptions,
    siteName
  }
}`

const mapPhoto = photo => ({
  ...photo,
  image: {
    ...photo.image,
    aspectRatio: photo.image.height / photo.image.width
  },
})

const reducePhotosToTags = (tags, photo) => {
  return [...new Set(tags.concat(photo.tags))]
}

const options = {
  shouldSort: true,
  threshold: 0.3,
}

const state = () => ({
  initialized: false,
  config: {},
  photos: [],
  photosIndex: null,
  tagsIndex: null,
  search: () => {},
})

const getters = {
  tags: state => {
    return state.photos.reduce(reducePhotosToTags, [])
  },

  searchTags: state => query => {
    return state.tagsIndex.search(query)
  },

  searchPhotos: state => query => {
    return state.photosIndex.search(query)
  },

  getPhoto: state => ({ id, slug })=> {
    return state.photos.filter(photo => {
      return photo.id === id || photo.slug === slug
    })[0]
  }
}

const mutations = {
  initialize(state, { photos, config }) {
    const tags = photos.reduce(reducePhotosToTags, [])

    state.initialized = true
    state.photos = photos
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
      photos: photos.map(mapPhoto),
      config: config[0]
    })
  }
}

export { state, getters, mutations, actions }
