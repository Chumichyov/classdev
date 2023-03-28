import { createStore } from "vuex";
import api from "../api";
import router from "../router";

// import authModule from "./modules/auth";
// import courseModule from "./modules/course";

export default createStore({
  state: {
    courses: [],
    error: {
      message: "Страница не найдена",
      code: "404",
    },
  },

  getters: {
    auth: (state) => {
      return state.auth;
    },
    courses: (state) => {
      return state.courses;
    },
    error: (state) => {
      return state.error;
    },
  },

  actions: {
    async allCourses(ctx) {
      await api.course
        .allCourses({
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          ctx.commit("setCourses", res.data.data);
        })
        .catch((err) => {
          ctx.commit("setError", {
            message: err.response.data.message,
            code: err.response.status,
          });

          if (err.response.data.status == 401) {
            this.logout();
          }

          router.push("/error");
        });
    },

    async signIn(ctx, auth) {
      await api.auth
        .signIn({
          email: auth.email,
          password: auth.password,
        })
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          router.push("/main");
        })
        .catch((err) => {
          ctx.commit("setError", {
            message: err.response.data.errors.message,
            code: err.response.status,
          });
        });
    },

    async signUp(ctx, auth) {
      await api.auth
        .signUp({
          email: auth.email,
          name: auth.name,
          surname: auth.surname,
          password: auth.password,
          password_confirmation: auth.password_confirmation,
        })
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          router.push("/main");
        })
        .catch((err) => {
          ctx.commit("setError", {
            message: err.response.data.errors.message,
            code: err.response.status,
          });
        });
    },

    async logout(ctx) {
      window.localStorage.removeItem("token");

      ctx.commit("setCourses", []);

      router.push("/login");
    },
  },

  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
    setError(state, error) {
      state.error = error;
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
  },

  // modules: {
  //   auth: authModule(Auth, api, router),
  //   course: courseModule(Auth, api, router),
  // },
});
