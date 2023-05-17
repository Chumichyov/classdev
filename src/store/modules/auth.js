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
            ctx.commit("setCourses", []);
            ctx.commit("setLoadedCourse", []);
            ctx.commit("setNotifications", []);
            ctx.commit("setPagination", []);
            ctx.commit("setNotificationSearch", "");
            ctx.commit("setNotificationsDefault", "");
            ctx.commit("setBelonging", "");
            ctx.commit("setLoadedTask", "");
            ctx.commit("setTasks", "");
            ctx.commit("setLoadedFiles", "");
            ctx.commit("setLoadedFolders", "");
            ctx.commit("setAuthUser", "");

            ctx.commit("setLoadStatusLoadedMainFiles", null);
            ctx.commit("setLoadStatusLoadedFiles", null);
            ctx.commit("setLoadStatusLoadedTask", null);
            ctx.commit("setLoadStatusLoadedTasks", null);
            ctx.commit("setLoadStatusLoadedCourse", null);
            ctx.commit("setLoadStatusLoadedNotifications", null);
            ctx.commit("setLoadStatusNotifications", null);
            ctx.commit("setLoadStatusAuthUser", null);
            ctx.commit("setLoadStatusCourses", null);
            ctx.getters.error.get401 = false;
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
            ctx.commit("setCourses", []);
            ctx.commit("setLoadedCourse", []);
            ctx.commit("setNotifications", []);
            ctx.commit("setPagination", []);
            ctx.commit("setNotificationSearch", "");
            ctx.commit("setNotificationsDefault", "");
            ctx.commit("setBelonging", "");
            ctx.commit("setLoadedTask", "");
            ctx.commit("setTasks", "");
            ctx.commit("setLoadedFiles", "");
            ctx.commit("setLoadedFolders", "");
            ctx.commit("setAuthUser", "");

            ctx.commit("setLoadStatusLoadedMainFiles", null);
            ctx.commit("setLoadStatusLoadedFiles", null);
            ctx.commit("setLoadStatusLoadedTask", null);
            ctx.commit("setLoadStatusLoadedTasks", null);
            ctx.commit("setLoadStatusLoadedCourse", null);
            ctx.commit("setLoadStatusLoadedNotifications", null);
            ctx.commit("setLoadStatusNotifications", null);
            ctx.commit("setLoadStatusAuthUser", null);
            ctx.commit("setLoadStatusCourses", null);
            ctx.getters.error.get401 = false;
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
        if (!error) {
          router.push("/login");
        } else {
          router.push("/error");
        }

        window.localStorage.removeItem("token");
      },
    },

    mutations: {},
  };
};
