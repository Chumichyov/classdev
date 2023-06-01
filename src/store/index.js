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
import decisionModule from "./modules/decision";
import messengerModule from "./modules/messenger";

export default createStore({
  state: {
    error: {
      message: "Похоже что страница, которую вы искали не найдена",
      status: "404",
      get401: false,
    },

    loadStatusAuthUser: null,
    loadStatusCourses: null,
    loadStatusNotifications: null,

    loadStatusUpdateDecision: null,
    loadStatusUpdateReview: null,
    loadStatusUpdateTask: null,
    loadStatusUpdateFolder: null,
    loadStatusUpdateFile: null,
    loadStatusLoadedCourse: null,
    loadStatusUpdateCourse: null,
    loadStatusCreateCourse: null,
    loadStatusLoadedCourses: null,
    loadStatusLoadedTasks: null,
    loadStatusLoadedTask: null,
    loadStatusCreateTask: null,
    loadStatusLoadedFiles: null,
    loadStatusLoadedFile: null,
    loadStatusLoadedMainFiles: null,
    loadStatusLoadedNotifications: null,
    loadStatusLoadedDecision: null,
    loadStatusLoadedDecisionFiles: null,
    loadStatusStoreFile: null,
    loadStatusStoreReview: null,
    loadStatusLoadedReviews: null,
    loadStatusLoadedMessengers: null,
    loadStatusLoadedMessenger: null,
    loadStatusUpdateUser: null,
  },
  getters: {
    loadStatusCourses: (state) => {
      return state.loadStatusCourses;
    },

    loadStatusUpdateUser: (state) => {
      return state.loadStatusUpdateUser;
    },

    loadStatusStoreReview: (state) => {
      return state.loadStatusStoreReview;
    },

    loadStatusUpdateReview: (state) => {
      return state.loadStatusUpdateReview;
    },

    loadStatusLoadedReviews: (state) => {
      return state.loadStatusLoadedReviews;
    },

    loadStatusUpdateDecision: (state) => {
      return state.loadStatusUpdateDecision;
    },

    loadStatusStoreFile: (state) => {
      return state.loadStatusStoreFile;
    },

    loadStatusLoadedDecisionFiles: (state) => {
      return state.loadStatusLoadedDecisionFiles;
    },

    loadStatusLoadedDecision: (state) => {
      return state.loadStatusLoadedDecision;
    },

    loadStatusUpdateCourse: (state) => {
      return state.loadStatusUpdateCourse;
    },

    loadStatusUpdateFile: (state) => {
      return state.loadStatusUpdateFile;
    },

    loadStatusUpdateFolder: (state) => {
      return state.loadStatusUpdateFolder;
    },

    loadStatusUpdateTask: (state) => {
      return state.loadStatusUpdateTask;
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

    loadStatusLoadedMessengers: (state) => {
      return state.loadStatusLoadedMessengers;
    },

    loadStatusLoadedMessenger: (state) => {
      return state.loadStatusLoadedMessenger;
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

    setLoadStatusUpdateTask(state, loadStatusUpdateTask) {
      state.loadStatusUpdateTask = loadStatusUpdateTask;
    },

    setLoadStatusUpdateFile(state, loadStatusUpdateFile) {
      state.loadStatusUpdateFile = loadStatusUpdateFile;
    },

    setLoadStatusUpdateCourse(state, loadStatusUpdateCourse) {
      state.loadStatusUpdateCourse = loadStatusUpdateCourse;
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

    setLoadStatusUpdateFolder(state, loadStatusUpdateFolder) {
      state.loadStatusUpdateFolder = loadStatusUpdateFolder;
    },

    setLoadStatusLoadedDecision(state, loadStatusLoadedDecision) {
      state.loadStatusLoadedDecision = loadStatusLoadedDecision;
    },

    setLoadStatusUpdateDecision(state, loadStatusUpdateDecision) {
      state.loadStatusUpdateDecision = loadStatusUpdateDecision;
    },

    setLoadStatusLoadedDecisionFiles(state, loadStatusLoadedDecisionFiles) {
      state.loadStatusLoadedDecisionFiles = loadStatusLoadedDecisionFiles;
    },

    setLoadStatusStoreFile(state, loadStatusStoreFile) {
      state.loadStatusStoreFile = loadStatusStoreFile;
    },

    setLoadStatusStoreReview(state, loadStatusStoreReview) {
      state.loadStatusStoreReview = loadStatusStoreReview;
    },

    setLoadStatusLoadedReviews(state, loadStatusLoadedReviews) {
      state.loadStatusLoadedReviews = loadStatusLoadedReviews;
    },

    setLoadStatusUpdateReview(state, loadStatusUpdateReview) {
      state.loadStatusUpdateReview = loadStatusUpdateReview;
    },

    setLoadStatusLoadedMessengers(state, loadStatusLoadedMessengers) {
      state.loadStatusLoadedMessengers = loadStatusLoadedMessengers;
    },

    setLoadStatusLoadedMessenger(state, loadStatusLoadedMessenger) {
      state.loadStatusLoadedMessenger = loadStatusLoadedMessenger;
    },

    setLoadStatusUpdateUser(state, loadStatusUpdateUser) {
      state.loadStatusUpdateUser = loadStatusUpdateUser;
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
    decision: decisionModule(api, router, LoadingStatuses),
    messenger: messengerModule(api, router, LoadingStatuses),
  },
});
