import api from "../api/index";

export default {
  install(App) {
    App.config.globalProperties.$api = api;
  },
};
