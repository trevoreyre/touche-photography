const nuxtClientInit = context => {
  const { store } = context
  if (!store.initialized) {
    return store.dispatch('nuxtServerInit', context)
  }
}

export default nuxtClientInit
