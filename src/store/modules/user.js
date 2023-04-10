export default (api, LoadingStatuses) => {
  return {
    state: {
      authUser: [],
    },

    getters: {
      authUser: (state) => {
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

            ctx.commit("setError", {
              message: err.response.data.message,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
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
