import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSplide from "@splidejs/vue-splide";
import splider from "./plugins/splider";
import ApiPlugin from "./plugins/api";
import UrlPlugin from "./plugins/url";
import MomentPlugin from "./plugins/moment";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";
import "./registerServiceWorker";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueSplide);
app.use(splider);
app.use(ApiPlugin);
app.use(UrlPlugin);
app.use(MomentPlugin);
app.use(VueClipboard);
app.mount("#app");
