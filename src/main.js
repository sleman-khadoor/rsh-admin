// import './assets/main.css'

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as plugins from '@/plugins/vuetify'
import router from './router'
import store from 'vuex';
// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  plugins,
  router,
  store
})

createApp(App).use(vuetify).mount('#app')

