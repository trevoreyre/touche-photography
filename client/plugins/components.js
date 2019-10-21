import Vue from 'vue'
import * as path from 'path'
import Masonry from 'vue-masonry-css'
import '@trevoreyre/ui/dist/ui.css'

Vue.use(Masonry);


// Globally register all components with App prefix
const req = require.context('../components', true, /App[A-Z]\w+\.vue$/)
req.keys().forEach(filename => {
  const config = req(filename)
  const name = path.basename(filename, '.vue')
  Vue.component(name, config.default || config)
})
