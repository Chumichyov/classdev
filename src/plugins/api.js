import api from "../api";

export default {
  install(App) {
    App.config.globalProperties.$api = api;
  },
};
