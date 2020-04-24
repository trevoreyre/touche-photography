import sanityClient from '~/sanityClient'
import Fuse from 'fuse.js'

const PHOTOS_QUERY = `
  *[_type == 'photo'] | order(_createdAt desc) {
    'id': _id,
    title,
    description,
    'slug': slug.current,
    tags,
    image {
      'asset': asset->,
      ...
    }
  }
`

const CONFIG_QUERY = `
  *[_id == 'global-config'][0] {
    purchaseOptions,
    siteName
  }
`

const QUERY = `{
  'photos': ${PHOTOS_QUERY},
  'config': ${CONFIG_QUERY}
}`

const options = {
  shouldSort: true,
  threshold: 0.3,
  includeMatches: true,
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
  searchTags: (state) => (query) => {
    return state.tagsIndex.search(query)
  },

  searchPhotos: (state) => (query) => {
    return state.photosIndex.search(query)
  },

  getPhoto: (state) => ({ id, slug }) => {
    return state.photos.find((photo) => {
      if (id !== undefined) return photo.id === id
      if (slug !== undefined) return photo.slug === slug
    })
  },

  getPurchaseOption: (state) => (key) => {
    return state.config.purchaseOptions.find((option) => option._key === key)
  },
}

const mutations = {
  initialize(state, { photos, config }) {
    const tags = photos.reduce((tags, photo) => {
      photo.tags = (photo.tags || []).map((tag) => tag.toLowerCase().trim())
      return [...new Set(tags.concat(photo.tags))]
    }, [])

    state.initialized = true
    state.photos = photos
    state.tags = tags
    state.config = config
    state.photosIndex = new Fuse(photos, {
      ...options,
      keys: ['title', 'tags'],
    })

    // Combine unique tags list and titles from photos for search bar
    state.tagsIndex = new Fuse(
      [
        ...tags.map((tag) => ({ tag })),
        ...photos.map((photo) => ({ title: photo.title.toLowerCase() })),
      ],
      { ...options, keys: ['title', 'tag'] }
    )
  },
}

const actions = {
  async nuxtServerInit({ commit }) {
    const { photos, config } = await sanityClient.fetch(QUERY)

    // TODO: Remove hard-coded baseUrl
    config['baseUrl'] = 'https://dev.touchephotography.com'
    commit({ type: 'initialize', photos, config })
  },
}

export { state, getters, mutations, actions }
