import { createRouter } from 'vue-router'
import Calculator from './calculator/Calculator.vue';
import Records from './records/Records.vue';
import Login from './login/Login.vue';
import { RouterHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },

    {
        path: '/calculator/',
        name: 'calculator',
        component: Calculator
    },

    {
        path: '/records/',
        name: 'records',
        component: Records
    },
]

export default function (history: RouterHistory) {
    return createRouter({
        history,
        routes
    })
}