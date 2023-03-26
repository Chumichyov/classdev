import api from "../../api/index";

export default {
  state: {
    auth: {
      email: "",
      password: "",
    },
  },

  getters: {
    auth: (state) => {
      return state.auth;
    },
  },

  actions: {
    async signIn(ctx, auth) {
      const data = (await api.auth.signIn(auth)).data;
      localStorage.setItem("token", data.token);
    },
  },

  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
  },
};
