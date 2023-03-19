import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import './assets/main.css'

// import components used in routes
import Home from './components/Home.vue';
import Repository from './components/Repository.vue';
import NotFound from './components/NotFound.vue';

const routes = [
    { path: "/", component: Home, name: 'Home', children: [{ path: "/repository", component: Repository, name: 'Repository' }] },
    
    { path: "/:catchAll(.*)", component: NotFound, name: 'NotFound' }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

const app = createApp(App);
app.use(router);
app.mount('#app');
