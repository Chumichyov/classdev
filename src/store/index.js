import { createStore } from "vuex";
import api from "../api";
import router from "../router";
import { LoadingStatuses } from "@/types";

import authModule from "./modules/auth";
import courseModule from "./modules/course";
import notificationModule from "./modules/notification";
import userModule from "./modules/user";
import taskModule from "./modules/task";

export default createStore({
  state: {
    error: {
      message: "Страница не найдена",
      status: "404",
    },

    loadStatusAuthUser: null,
    loadStatusCourses: null,
    loadStatusNotifications: null,

    loadStatusLoadedCourse: null,
    loadStatusLoadedTasks: null,
    loadStatusLoadedNotifications: null,
  },
  getters: {
    loadStatusCourses: (state) => {
      return state.loadStatusCourses;
    },

    loadStatusAuthUser: (state) => {
      return state.loadStatusAuthUser;
    },

    loadStatusLoadedCourse: (state) => {
      return state.loadStatusLoadedCourse;
    },

    loadStatusLoadedTasks: (state) => {
      return state.loadStatusLoadedTasks;
    },

    loadStatusNotifications: (state) => {
      return state.loadStatusNotifications;
    },

    loadStatusLoadedNotifications: (state) => {
      return state.loadStatusLoadedNotifications;
    },

    error: (state) => {
      return state.error;
    },
  },
  actions: {},
  mutations: {
    setLoadStatusCourses(state, loadStatusCourses) {
      state.loadStatusCourses = loadStatusCourses;
    },

    setLoadStatusAuthUser(state, loadStatusAuthUser) {
      state.loadStatusAuthUser = loadStatusAuthUser;
    },

    setLoadStatusNotifications(state, loadStatusNotifications) {
      state.loadStatusNotifications = loadStatusNotifications;
    },

    setLoadStatusLoadedNotifications(state, loadStatusLoadedNotifications) {
      state.loadStatusLoadedNotifications = loadStatusLoadedNotifications;
    },

    setLoadStatusLoadedCourse(state, loadStatusLoadedCourse) {
      state.loadStatusLoadedCourse = loadStatusLoadedCourse;
    },

    setLoadStatusLoadedTasks(state, loadStatusLoadedTasks) {
      state.loadStatusLoadedTasks = loadStatusLoadedTasks;
    },

    setError(state, error) {
      state.error = error;
    },
  },

  modules: {
    auth: authModule(api, router),
    course: courseModule(api, router, LoadingStatuses),
    notification: notificationModule(api, router, LoadingStatuses),
    user: userModule(api, LoadingStatuses),
    task: taskModule(api, LoadingStatuses),
  },
});
