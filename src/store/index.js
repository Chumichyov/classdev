import { createStore } from "vuex";
import api from "../api";
import router from "../router";
import { LoadingStatuses } from "@/types";

import authModule from "./modules/auth";
import courseModule from "./modules/course";
import notificationModule from "./modules/notification";
import userModule from "./modules/user";
import taskModule from "./modules/task";
import folderModule from "./modules/folder";

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
    loadStatusLoadedTask: null,
    loadStatusLoadedFiles: null,
    loadStatusLoadedMainFiles: null,
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

    loadStatusLoadedTask: (state) => {
      return state.loadStatusLoadedTask;
    },

    loadStatusLoadedFiles: (state) => {
      return state.loadStatusLoadedFiles;
    },

    loadStatusLoadedMainFiles: (state) => {
      return state.loadStatusLoadedMainFiles;
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

    setLoadStatusLoadedTask(state, loadStatusLoadedTask) {
      state.loadStatusLoadedTask = loadStatusLoadedTask;
    },

    setLoadStatusLoadedFiles(state, loadStatusLoadedFiles) {
      state.loadStatusLoadedFiles = loadStatusLoadedFiles;
    },

    setLoadStatusLoadedMainFiles(state, loadStatusLoadedMainFiles) {
      state.loadStatusLoadedMainFiles = loadStatusLoadedMainFiles;
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
    task: taskModule(api, router, LoadingStatuses),
    folder: folderModule(api, LoadingStatuses),
  },
});
