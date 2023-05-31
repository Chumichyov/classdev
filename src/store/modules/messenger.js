export default (api, router, LoadingStatuses) => {
  return {
    state: {
      messengers: [],
      messenger: [],
    },

    getters: {
      messengers: (state) => {
        return state.messengers;
      },

      messenger: (state) => {
        return state.messenger;
      },
    },

    actions: {
      async getMessengers(
        ctx,
        data = {
          course: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedMessengers", LoadingStatuses.Loading);
        await api.messenger
          .messengers(data)
          .then((res) => {
            if (res.data.data.length == 0) {
              ctx.commit(
                "setLoadStatusLoadedMessengers",
                LoadingStatuses.Empty
              );
            } else {
              ctx.commit(
                "setLoadStatusLoadedMessengers",
                LoadingStatuses.Ready
              );

              ctx.commit("setMessengers", res.data.data);
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedMessengers", LoadingStatuses.Error);

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

            router.push({
              name: "error",
            });
          });
      },

      async getMessenger(
        ctx,
        data = {
          course: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Loading);
        await api.messenger
          .messenger(data)
          .then((res) => {
            if (res.data.data.length == 0) {
              ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Empty);
            } else {
              ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Ready);

              ctx.commit("setMessenger", res.data.data);
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Error);

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

            router.push({
              name: "error",
            });
          });
      },

      async searchMessengers(
        ctx,
        data = {
          course: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedMessengers", LoadingStatuses.Loading);
        await api.messenger
          .search(data)
          .then((res) => {
            console.log(res);
            if (res.data.data.length == 0) {
              ctx.commit(
                "setLoadStatusLoadedMessengers",
                LoadingStatuses.Empty
              );

              ctx.commit("setMessengers", []);
            } else {
              ctx.commit(
                "setLoadStatusLoadedMessengers",
                LoadingStatuses.Ready
              );

              ctx.commit("setMessengers", res.data.data);
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedMessengers", LoadingStatuses.Error);

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

            router.push({
              name: "error",
            });
          });
      },

      async storeMessage(
        ctx,
        data = {
          course: "",
          messenger: "",
          content: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Loading);
        await api.messenger
          .storeMessage(data)
          .then((res) => {
            if (res.data.data.length == 0) {
              ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Empty);
            } else {
              ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Ready);

              ctx.commit("setMessage", res.data.data);
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedMessenger", LoadingStatuses.Error);

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

            router.push({
              name: "error",
            });
          });
      },
    },

    mutations: {
      setMessengers(state, messengers) {
        state.messengers = messengers;
      },

      setMessenger(state, messenger) {
        state.messenger = messenger;
      },

      setMessage(state, message) {
        state.messenger.messages.push(message);
      },
    },
  };
};
