// import Vue from 'vue';
import { createWebHistory, createRouter} from 'vue-router';

import Home from '../pages/Home'
import Historico from '../pages/Historico'

const routes = [
    {
        name: 'home',
        path: '/home',
        component: Home
    },
    {
        path: '/',
        component: Home
    },
    {
        name: 'historico',
        path: '/historico',
        component: Historico
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;