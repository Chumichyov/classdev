export default (api, LoadingStatuses) => {
  return {
    state: {
      tasks: [],

      dates: [],
    },

    getters: {
      tasks: (state) => {
        return state.tasks;
      },

      dates: (state) => {
        return state.dates;
      },
    },

    actions: {
      async getTasks(ctx, course) {
        ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Loading);
        await api.task
          .indexTasks({
            course,
            type: "Date",
          })
          .then((res) => {
            if (res.data.data.tasks.length == 0)
              ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Ready);

            ctx.commit("setTasks", res.data.data.tasks);
            ctx.commit("setDates", res.data.data.dates);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Error);

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
      setTasks(state, tasks) {
        state.tasks = tasks;
      },

      setDates(state, dates) {
        state.dates = dates;
      },
    },
  };
};
