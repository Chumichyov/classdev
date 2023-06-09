export default (api, router, LoadingStatuses) => {
  return {
    state: {
      notificationSearch: "",

      notifications: [],

      haveUnread: "",

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

      haveUnread: (state) => {
        return state.haveUnread;
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

      async notificationsDefault(ctx) {
        ctx.commit("setLoadStatusNotifications", LoadingStatuses.Loading);
        await api.notification
          .notificationsDefault()
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusNotifications", LoadingStatuses.Empty);
            else
              ctx.commit("setLoadStatusNotifications", LoadingStatuses.Ready);

            ctx.commit("setNotificationsDefault", res.data.data.notifications);
            ctx.commit("setHaveUnread", res.data.data.haveUnread);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusNotifications", LoadingStatuses.Error);

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

      async notificationRead(ctx, notification) {
        await api.notification
          .read({
            notification: notification,
          })
          .then((res) => {
            if (res.data.data.length != 0) {
              ctx.commit("setHaveUnread", res.data.data.haveUnread);

              ctx.getters.notificationsDefault.forEach((element) => {
                if (element.id == notification) {
                  element.isRead = 1;
                }
              });

              if (ctx.getters.notifications != "") {
                ctx.getters.notifications.forEach((element) => {
                  if (element.id == notification) {
                    element.isRead = 1;
                  }
                });
              }
            }
          })
          .catch((err) => {
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
      setNotifications(state, notifications) {
        state.notifications = notifications;
      },

      setHaveUnread(state, haveUnread) {
        state.haveUnread = haveUnread;
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
