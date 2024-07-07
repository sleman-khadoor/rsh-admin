// import './assets/main.css'

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as plugins from '@/plugins/vuetify'
import createRouter from './router'
import { store } from './store';
// Components
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'

const vuetify = createVuetify({
  components,
  directives,
  plugins,
})

const colors = createApp(App).colors = {
  ff_orange: '#1a238a',
  red: 'red',
  green: '#39df9b',
  white: '#FFFFFF',
  dark_blue: '#0C2748',
  white_grey: '#E9E9E9',
  grey: '#DEDEDE',
  dark_grey: '#BEBEBE',
  deep_grey: '#4b4b4b'
}
// createApp(App).use(vuetify).mount('#app')
const app = createApp(App);
const router = createRouter();

app.use(colors);
app.use(Notifications);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');

