// import './assets/main.css'

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as plugins from '@/plugins/vuetify'
import createRouter from './router'
import store from './store';
// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  plugins,
})

// createApp(App).use(vuetify).mount('#app')
const app = createApp(App);
const router = createRouter();

app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');

