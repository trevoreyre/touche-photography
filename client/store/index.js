import Vue from 'vue'
import sanityClient from '~/sanityClient'
import Fuse from 'fuse.js'

const PAGE_QUERY = `
  *[_type == 'page' && slug.current == $slug] {
    'id': _id,
    title,
    'slug': slug.current,
    featuredImage {
      'asset': asset->,
      ...,
    },
    content[] {
      'asset': asset->,
      ...,
    },
  }
`

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

const PRODUCTS_QUERY = `
  *[_type == 'product'] {
    'id': _id,
    name,
    sizes[] {
      'id': _key,
      width,
      height,
      price
    }
  }
`

const INITIALIZE_QUERY = `{
  'photos': ${PHOTOS_QUERY},
  'products': ${PRODUCTS_QUERY}
}`

const options = {
  shouldSort: true,
  threshold: 0.3,
  includeMatches: true,
}

const state = () => ({
  initialized: false,
  pages: {},
  photos: [],
  photosIndex: null,
  products: [],
  tags: [],
  tagsIndex: null,
  search: () => {},
})

const getters = {
  getPage: (state) => (slug) => {
    return state.pages[slug]
  },

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

  getProduct: (state) => (id) => {
    return state.products.find((product) => product.id === id)
  },
}

const mutations = {
  initialize(state, { photos, products }) {
    const tags = photos.reduce((tags, photo) => {
      photo.tags = (photo.tags ?? []).map((tag) => tag.toLowerCase().trim())
      return [...new Set(tags.concat(photo.tags))]
    }, [])

    state.initialized = true
    state.photos = photos
    state.tags = tags
    state.products = products
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

  setPage(state, { page, slug }) {
    Vue.set(state.pages, slug, page ?? 404)
  },
}

const actions = {
  async nuxtServerInit({ commit }) {
    const { photos, products } = await sanityClient.fetch(INITIALIZE_QUERY)
    commit({ type: 'initialize', photos, products })
  },

  async fetchPage({ commit, state }, slug) {
    if (state.pages[slug]) {
      return
    }
    const [page] = await sanityClient.fetch(PAGE_QUERY, { slug })
    commit({ type: 'setPage', page, slug })
  },
}

export { state, getters, mutations, actions }
