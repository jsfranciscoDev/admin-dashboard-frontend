import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import "./axios";

import App from './App.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
