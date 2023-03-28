import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/error",
    name: "error",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/HttpCodeError.vue"),
  },
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
    meta: { layout: "default", requiresAuth: true },
    component: () => import("@/views/MainView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/HttpCodeError.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") !== null) {
      next();
      return;
    } else {
      router.push("/login");
    }
  } else {
    next();
  }
});

export default router;
