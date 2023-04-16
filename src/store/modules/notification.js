export default (api, router, LoadingStatuses) => {
  return {
    state: {
      notificationSearch: "",

      notifications: [],

      notificationsDefault: [],

      pagination: [],
    },

    getters: {
      notificationSearch: (state) => {
        return state.notificationSearch;
      },

      notifications: (state) => {
        return state.notifications;
      },

      notificationsDefault: (state) => {
        return state.notificationsDefault;
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
        ctx.commit("setLoadStatusLoadedNotifications", LoadingStatuses.Loading);
        await api.notification
          .notifications({
            page: data.page,
            type: data.type,
            search: ctx.state.notificationSearch,
            all: data.all,
          })
          .then((res) => {
            console.log(data.type);
            if (res.data.data.length == 0)
              ctx.commit(
                "setLoadStatusLoadedNotifications",
                LoadingStatuses.Empty
              );
            else
              ctx.commit(
                "setLoadStatusLoadedNotifications",
                LoadingStatuses.Ready
              );

            ctx.commit("setPagination", res.data.meta);
            ctx.commit("setNotifications", res.data.data);
          })
          .catch((err) => {
            ctx.commit(
              "setLoadStatusLoadedNotifications",
              LoadingStatuses.Error
            );

            ctx.commit("setError", {
              message: err.response.data.message,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async notificationsDefault(ctx) {
        ctx.commit("setLoadStatusNotifications", LoadingStatuses.Loading);
        await api.notification
          .notificationsDefault()
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusNotifications", LoadingStatuses.Empty);
            else
              ctx.commit("setLoadStatusNotifications", LoadingStatuses.Ready);

            ctx.commit("setNotificationsDefault", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusNotifications", LoadingStatuses.Error);

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
      setNotifications(state, notifications) {
        state.notifications = notifications;
      },

      setNotificationsDefault(state, notificationsDefault) {
        state.notificationsDefault = notificationsDefault;
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
