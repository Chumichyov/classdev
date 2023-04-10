export default (api, router) => {
  return {
    state: {},

    getters: {
      auth: (state) => {
        return state.auth;
      },
    },

    actions: {
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

      async logout(ctx, error = false) {
        window.localStorage.removeItem("token");

        if (!error) {
          router.push("/login");
        } else {
          router.push("/error");
        }

        ctx.commit("setCourses", []);
        ctx.commit("setNotifications", []);
        ctx.commit("setPagination", []);
        ctx.commit("setNotificationSearch", "");
      },
    },

    mutations: {},
  };
};
