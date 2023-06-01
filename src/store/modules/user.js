export default (api, router, LoadingStatuses) => {
  return {
    state: {
      authUser: [],
    },

    getters: {
      authUser: (state) => {
        return state.authUser;
      },

      isTeacher: (state, getters) => {
        return state.authUser.id == getters.loadedCourse.leader_id;
      },

      isAdmin: (state) => {
        return state.authUser;
      },
    },

    actions: {
      async getAuthUser(ctx) {
        ctx.commit("setLoadStatusAuthUser", LoadingStatuses.Loading);
        await api.user
          .authUser()
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusAuthUser", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusAuthUser", LoadingStatuses.Ready);

            ctx.commit("setAuthUser", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusAuthUser", LoadingStatuses.Error);

            if (ctx.getters.error.status != err.response.status) {
              ctx.commit("setError", {
                message: err.response.statusText,
                status: err.response.status,
              });
            }

            if (
              err.response.status == 401 &&
              ctx.getters.error.get401 != true
            ) {
              ctx.getters.error.get401 = true;
              ctx.dispatch("logout", false);
            }
          });
      },

      async userUpdate(ctx, data) {
        ctx.commit("setLoadStatusUpdateUser", LoadingStatuses.Loading);
        await api.user
          .userUpdate(data)
          .then(() => {
            if (data.name) ctx.getters.authUser.name = data.name;
            if (data.surname) ctx.getters.authUser.surname = data.surname;
            if (
              data.bio &&
              ctx.getters.authUser.information &&
              ctx.getters.authUser.information.bio
            )
              ctx.getters.authUser.information.bio = data.bio;

            ctx.commit("setLoadStatusUpdateUser", LoadingStatuses.Ready);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateUser", LoadingStatuses.Error);

            if (ctx.getters.error.status != err.response.status) {
              ctx.commit("setError", {
                message: err.response.statusText,
                status: err.response.status,
              });
            }

            if (
              err.response.status == 401 &&
              ctx.getters.error.get401 != true
            ) {
              ctx.getters.error.get401 = true;
              ctx.dispatch("logout", false);
            }
          });
      },

      async imageUpdate(ctx, data) {
        ctx.commit("setLoadStatusUpdateUser", LoadingStatuses.Loading);
        await api.user
          .imageUpdate(data)
          .then((res) => {
            if (
              ctx.getters.authUser.information &&
              ctx.getters.authUser.information.photo_path
            ) {
              ctx.getters.authUser.information.photo_path =
                res.data.data.photo_path;
            }

            ctx.commit("setLoadStatusUpdateUser", LoadingStatuses.Ready);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateUser", LoadingStatuses.Error);

            if (ctx.getters.error.status != err.response.status) {
              ctx.commit("setError", {
                message: err.response.statusText,
                status: err.response.status,
              });
            }

            if (
              err.response.status == 401 &&
              ctx.getters.error.get401 != true
            ) {
              ctx.getters.error.get401 = true;
              ctx.dispatch("logout", false);
            }
          });
      },
    },

    mutations: {
      setAuthUser(state, authUser) {
        state.authUser = authUser;
      },
    },
  };
};
