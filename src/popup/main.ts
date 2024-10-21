import 'vue-global-api'
import { createApp } from 'vue'
import App from './Popup.vue'
import i18n from '~/plugins/i18n'
import '../styles'

import { Buffer } from 'buffer'
window.Buffer = Buffer

const app = createApp(App)
app.use(i18n).mount('#app')
