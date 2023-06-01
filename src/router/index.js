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
    meta: {
      layout: "empty",
    },
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

  // {
  //   path: "/new",
  //   name: "new",
  //   meta: { layout: "default", requiresAuth: true },
  //   component: () => import("@/views/NewView.vue"),
  // },

  {
    path: "/notifications",
    name: "notifications",
    meta: { layout: "default", requiresAuth: true, sidebar: "notification" },
    component: () => import("@/views/NotificationsView.vue"),
  },

  // {
  //   path: "/courses/:course",
  //   name: "course",
  //   meta: { layout: "default", requiresAuth: true },
  //   component: () => import("@/views/CourseView.vue"),
  // },

  {
    path: "/courses/:course/tasks",
    name: "course.tasks",
    meta: { layout: "default", requiresAuth: true, type: "tasks" },
    component: () => import("@/views/CourseView.vue"),
  },

  {
    path: "/courses/:course/members",
    name: "course.members",
    meta: { layout: "default", requiresAuth: true, type: "members" },
    component: () => import("@/views/CourseView.vue"),
  },

  {
    path: "/courses/:course/messenger",
    name: "course.messenger",
    meta: { layout: "default", requiresAuth: true, type: "messenger" },
    component: () => import("@/views/CourseView.vue"),
  },

  {
    path: "/courses/:course/grades",
    name: "course.grades",
    meta: { layout: "default", requiresAuth: true, type: "grades" },
    component: () => import("@/views/CourseView.vue"),
  },

  {
    path: "/courses/:course/settings",
    name: "course.settings",
    meta: { layout: "default", requiresAuth: true, type: "settings" },
    component: () => import("@/views/CourseView.vue"),
  },

  {
    path: "/courses/:course/tasks/:task",
    name: "task",
    meta: { layout: "default", requiresAuth: true, type: "FoldersView" },
    component: () => import("@/views/TaskView.vue"),
  },

  {
    path: "/courses/:course/tasks/:task/settings",
    name: "task.settings",
    meta: { layout: "default", requiresAuth: true, type: "SettingsView" },
    component: () => import("@/views/TaskView.vue"),
  },

  {
    path: "/courses/:course/tasks/:task/folders/:folder",
    name: "folder",
    meta: { layout: "default", requiresAuth: true, type: "FoldersView" },
    component: () => import("@/views/TaskView.vue"),
  },

  {
    path: "/courses/:course/tasks/:task/files/:file",
    name: "file",
    meta: { layout: "default", requiresAuth: true, type: "FileView" },
    component: () => import("@/views/TaskView.vue"),
  },

  {
    path: "/courses/:course/tasks/:task/decisions/:decision/files/:file",
    name: "fileDecision",
    meta: { layout: "default", requiresAuth: true, type: "FileView" },
    component: () => import("@/views/TaskView.vue"),
  },

  {
    path: "/courses/:course/tasks/:task/decisions/:decision",
    name: "decision",
    meta: { layout: "default", requiresAuth: true },
    component: () => import("@/views/DecisionView.vue"),
  },

  {
    path: "/courses/:course/chats/:messenger",
    name: "chat",
    meta: { layout: "default", requiresAuth: true, type: "chat" },
    component: () => import("@/views/CourseView.vue"),
  },

  {
    path: "/connection/:link",
    name: "connection",
    meta: { requiresAuth: true },
    component: () => import("@/views/ConnectionView.vue"),
  },

  {
    path: "/profile",
    name: "profile",
    meta: { layout: "default", requiresAuth: true },
    component: () => import("@/views/ProfileView.vue"),
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
      router.push("/error");
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
