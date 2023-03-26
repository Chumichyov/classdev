import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/",
    name: "welcome",
    meta: { layout: "welcome" },
    component: () => import("@/views/WelcomeView.vue"),
  },
  {
    path: "/main",
    name: "main",
    meta: { layout: "default", auth: true },
    component: () => import("@/views/MainView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
