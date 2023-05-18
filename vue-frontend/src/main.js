import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue/es/arco-vue'

const app = createApp(App)

app.use(createPinia()).use(router).use(ArcoVue)

app.mount('#app')