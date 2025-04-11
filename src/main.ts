import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app"

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi, aliases } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi }
      },
  })

  const firebaseConfig = {
    apiKey: "AIzaSyApfU7uSNmHRXTmQyRXkPoULkpnrSW9iWI",
    authDomain: "vuetify-project-a0d6c.firebaseapp.com",
    projectId: "vuetify-project-a0d6c",
    storageBucket: "vuetify-project-a0d6c.firebasestorage.app",
    messagingSenderId: "93028674620",
    appId: "1:93028674620:web:f7c57806b391868a376739",
    measurementId: "G-Z7DD3DXWC8"
  }

  initializeApp(firebaseConfig)

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app')
