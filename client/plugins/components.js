import Vue from 'vue'
import * as path from 'path'
import '@trevoreyre/ui/dist/ui.css'

// Globally register all components with App prefix
const req = require.context('../components', true, /App[A-Z]\w+\.vue$/)
req.keys().forEach(filename => {
  const config = req(filename)
  const name = path.basename(filename, '.vue')
  Vue.component(name, config.default || config)
})
