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
    },

    mutations: {
      setAuthUser(state, authUser) {
        state.authUser = authUser;
      },
    },
  };
};
