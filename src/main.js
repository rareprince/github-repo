import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import './assets/main.css'

// import components used in routes
import Home from './components/Home.vue';
import Repository from './components/Repository.vue';
import NotFound from './components/NotFound.vue';

const routes = [
    { path: "/", component: Home, name: 'Home' },
    
  { path: '/repository', component: Repository, name: 'Repository' },
    
    { path: "/(*)", component: NotFound, name: 'NotFound' }
];

const router = createRouter({
    routes,
    history: createWebHashHistory()
});

const app = createApp(App);
app.use(router);
app.mount('#app');
 