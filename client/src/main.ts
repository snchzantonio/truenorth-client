import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import createRouter from './pages/routes.js'
import { createWebHistory } from 'vue-router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components:{
        ...components,
        ...labs,
    },
    directives,
})

const router = createRouter(createWebHistory())
createApp(App).use(router).use(vuetify).mount('#app')

