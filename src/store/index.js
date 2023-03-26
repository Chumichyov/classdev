import { createStore } from "vuex";
import auth from "./modules/auth";
import api from "../api/index";
import router from "../router/index";

export default createStore({
  modules: {
    auth: auth(api, router),
  },
});
