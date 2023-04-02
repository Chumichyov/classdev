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
    path: "/:pathMatch(.*)*",
    name: "error",
    meta: { layout: "empty" },
    component: () => import("@/views/HttpCodeError.vue"),
  },

  {
    path: "/login",
    name: "login",
    meta: { layout: "empty", requiresAuth: false },
    component: () => import("@/views/LoginView.vue"),
  },

  {
    path: "/register",
    name: "register",
    meta: { layout: "empty", requiresAuth: false },
    component: () => import("@/views/RegisterView.vue"),
  },

  {
    path: "/",
    name: "welcome",
    meta: { layout: "welcome", requiresAuth: false },
    component: () => import("@/views/WelcomeView.vue"),
  },

  {
    path: "/main",
    name: "main",
    meta: { layout: "default", requiresAuth: true, sidebar: "default" },
    component: () => import("@/views/MainView.vue"),
  },

  {
    path: "/new",
    name: "new",
    meta: { layout: "default", requiresAuth: true },
    component: () => import("@/views/NewView.vue"),
  },

  {
    path: "/notifications",
    name: "notifications",
    meta: { layout: "default", requiresAuth: true, sidebar: "notification" },
    component: () => import("@/views/NotificationsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth == true)) {
    if (localStorage.getItem("token") !== null) {
      next();
      return;
    } else {
      router.push("/login");
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth == false)) {
    if (localStorage.getItem("token") !== null) {
      router.push("/main");
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
