import Vue from 'vue'
import * as path from 'path'
import Masonry from 'vue-masonry-css'

Vue.use(Masonry);

// Globally register all App* components and icons
const req = require.context('../components', true, /[App|Icon]\w*\.vue$/)
req.keys().forEach(filename => {
  const config = req(filename)
  const name = path.basename(filename, '.vue')
  Vue.component(name, config.default || config)
})
