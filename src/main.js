import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/main.css'
import { createPinia } from 'pinia'
import { prepareTemplates } from '@/data/prepareTemplates.js'

createApp(App).use(createPinia()).use(router).mount('#app')

prepareTemplates() // TODO add explanation
