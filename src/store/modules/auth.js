export default (api, router) => {
  return {
    state: {
      auth: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        name: "",
        surname: "",
        password: "",
        password_confirmation: "",
      },
      token: "",
      error: {
        message: "",
        code: "",
      },
    },

    getters: {
      auth: (state) => {
        return state.auth;
      },
      register: (state) => {
        return state.register;
      },
      error: (state) => {
        return state.error;
      },
    },

    actions: {
      async signIn(ctx, auth) {
        await api.auth
          .signIn({
            email: auth.email,
            password: auth.password,
          })
          .then((data) => {
            localStorage.setItem("token", data.data.token);
            ctx.commit("setToken", data.data.token);
            router.push("/main");
          })
          .catch((err) =>
            ctx.commit("setError", {
              message: err.response.data.errors.message,
              code: err.response.status,
            })
          );
      },
      async signUp(ctx, register) {
        await api.auth
          .signUp({
            email: register.email,
            name: register.name,
            surname: register.surname,
            password: register.password,
            password_confirmation: register.password_confirmation,
          })
          .then((data) => {
            localStorage.setItem("token", data.data.token);
            router.push("/main");
          })
          .catch((err) =>
            ctx.commit("setError", {
              message: err.response.data.errors.message,
              code: err.response.status,
            })
          );
      },
    },

    mutations: {
      setAuth(state, auth) {
        state.auth = auth;
      },
      setRegister(state, register) {
        state.register = register;
      },
      setError(state, error) {
        state.error = error;
      },
      setToken(state, token) {
        state.token = token;
      },
    },
  };
};
