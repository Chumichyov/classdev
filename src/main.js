import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSplide from "@splidejs/vue-splide";
import splider from "./plugins/splider";
import ApiPlugin from "./plugins/api";
import UrlPlugin from "./plugins/url";
import MomentPlugin from "./plugins/moment";
import "./registerServiceWorker";

createApp(App)
  .use(store)
  .use(router)
  .use(VueSplide)
  .use(splider)
  .use(ApiPlugin)
  .use(UrlPlugin)
  .use(MomentPlugin)
  .mount("#app");
