
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Repository from "./components/Repository.vue";
import NotFound from "./components/NotFound.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/repository", component: Repository },
  { path: "/(*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
