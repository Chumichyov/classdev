export default {
  install(App) {
    App.config.globalProperties.$url = "http://127.0.0.1:8000/";
    App.config.globalProperties.$webUrl = "http://localhost:8080/";
  },
};
