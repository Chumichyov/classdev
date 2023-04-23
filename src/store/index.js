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
import fileModule from "./modules/file";

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
    loadStatusCreateCourse: null,
    loadStatusLoadedCourses: null,
    loadStatusLoadedTasks: null,
    loadStatusLoadedTask: null,
    loadStatusCreateTask: null,
    loadStatusLoadedFiles: null,
    loadStatusLoadedFile: null,
    loadStatusLoadedMainFiles: null,
    loadStatusLoadedNotifications: null,
  },
  getters: {
    loadStatusCourses: (state) => {
      return state.loadStatusCourses;
    },

    loadStatusCreateCourse: (state) => {
      return state.loadStatusCreateCourse;
    },

    loadStatusAuthUser: (state) => {
      return state.loadStatusAuthUser;
    },

    loadStatusLoadedCourse: (state) => {
      return state.loadStatusLoadedCourse;
    },

    loadStatusLoadedCourses: (state) => {
      return state.loadStatusLoadedCourses;
    },

    loadStatusLoadedTasks: (state) => {
      return state.loadStatusLoadedTasks;
    },

    loadStatusLoadedTask: (state) => {
      return state.loadStatusLoadedTask;
    },

    loadStatusCreateTask: (state) => {
      return state.loadStatusCreateTask;
    },

    loadStatusLoadedFiles: (state) => {
      return state.loadStatusLoadedFiles;
    },

    loadStatusLoadedFile: (state) => {
      return state.loadStatusLoadedFile;
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

    setLoadStatusCreateCourse(state, loadStatusCreateCourse) {
      state.loadStatusCreateCourse = loadStatusCreateCourse;
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

    setLoadStatusLoadedCourses(state, loadStatusLoadedCourses) {
      state.loadStatusLoadedCourses = loadStatusLoadedCourses;
    },

    setLoadStatusLoadedTasks(state, loadStatusLoadedTasks) {
      state.loadStatusLoadedTasks = loadStatusLoadedTasks;
    },

    setLoadStatusLoadedTask(state, loadStatusLoadedTask) {
      state.loadStatusLoadedTask = loadStatusLoadedTask;
    },

    setLoadStatusCreateTask(state, loadStatusCreateTask) {
      state.loadStatusCreateTask = loadStatusCreateTask;
    },

    setLoadStatusLoadedFiles(state, loadStatusLoadedFiles) {
      state.loadStatusLoadedFiles = loadStatusLoadedFiles;
    },

    setLoadStatusLoadedFile(state, loadStatusLoadedFile) {
      state.loadStatusLoadedFile = loadStatusLoadedFile;
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
    user: userModule(api, router, LoadingStatuses),
    task: taskModule(api, router, LoadingStatuses),
    folder: folderModule(api, router, LoadingStatuses),
    file: fileModule(api, router, LoadingStatuses),
  },
});
