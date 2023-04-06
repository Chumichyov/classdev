export default (api, router) => {
  return {
    state: {
      notificationSearch: "",

      notifications: [],

      pagination: [],
    },

    getters: {
      notificationSearch: (state) => {
        return state.notificationSearch;
      },

      notifications: (state) => {
        return state.notifications;
      },

      pagination: (state) => {
        return state.pagination;
      },
    },

    actions: {
      async notifications(
        ctx,
        data = {
          page: 1,
          type: "Task",
          all: "true",
        }
      ) {
        await api.notification
          .notifications({
            page: data.page,
            type: data.type,
            search: ctx.state.notificationSearch,
            all: data.all,
          })
          .then((res) => {
            ctx.commit("setPagination", res.data.meta);
            ctx.commit("setNotifications", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.data.message,
              status: err.response.status,
            });
            router.push("/error");
            if (err.response.status == 401) {
              ctx.dispatch("logout");
            }
          });
      },
    },

    mutations: {
      setNotifications(state, notifications) {
        state.notifications = notifications;
      },

      setPagination(state, pagination) {
        state.pagination = pagination;
      },

      setNotificationSearch(state, notificationSearch) {
        state.notificationSearch = notificationSearch;
      },
    },
  };
};
