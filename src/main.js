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

const colors = {
  choco: '#7B7045',
  green: '#218838',
  red: '#FF2727',
  white_grey: '#F8F8F8',
  dark_blue: '#0C2748',
}
// createApp(App).use(vuetify).mount('#app')
const app = createApp(App);
const router = createRouter();

app.config.globalProperties.$colors = colors;
app.use(Notifications);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');

