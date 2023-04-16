export default (api, router, LoadingStatuses) => {
  return {
    state: {
      tasks: [],

      loadedTask: "",

      loadedFiles: [],
      loadedFolders: [],
      mainFolder: [],

      dates: [],
    },

    getters: {
      tasks: (state) => {
        return state.tasks;
      },

      mainFolder: (state) => {
        return state.mainFolder;
      },

      loadedTask: (state) => {
        return state.loadedTask;
      },

      loadedFiles: (state) => {
        return state.loadedFiles;
      },

      loadedFolders: (state) => {
        return state.loadedFolders;
      },

      dates: (state) => {
        return state.dates;
      },
    },

    actions: {
      async getTasks(ctx, course) {
        if (
          ctx.getters.loadedCourse.id != course ||
          ctx.getters.loadStatusLoadedTasks != "READY"
        ) {
          ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Loading);
          await api.task
            .indexTasks({
              course,
              type: "Date",
            })
            .then((res) => {
              if (res.data.data.tasks.length == 0)
                ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Empty);
              else
                ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Ready);

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
        } else {
          ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Ready);
        }
      },

      async getTask(
        ctx,
        data = {
          course: "",
          task: "",
        }
      ) {
        if (
          ctx.getters.loadedTask.id != data.task ||
          ctx.getters.loadStatusLoadedMainFiles != "READY"
        ) {
          ctx.commit("setLoadStatusLoadedTask", LoadingStatuses.Loading);
          ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Loading);
          ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Loading);
          await api.task
            .showTask({
              course: data.course,
              task: data.task,
            })
            .then((res) => {
              if (res.data.data.length == 0) {
                ctx.commit("setLoadStatusLoadedTask", LoadingStatuses.Empty);
                ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Empty);
                ctx.commit(
                  "setLoadStatusLoadedMainFiles",
                  LoadingStatuses.Empty
                );
              } else {
                ctx.commit("setLoadStatusLoadedTask", LoadingStatuses.Ready);
                ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Ready);
                ctx.commit(
                  "setLoadStatusLoadedMainFiles",
                  LoadingStatuses.Ready
                );
                ctx.commit("setBelonging", "");
              }

              ctx.commit("setLoadedTask", res.data.data);

              ctx.commit("setMainFolder", res.data.data.folders[0]);
              ctx.commit("setLoadedFiles", res.data.data.files);
              ctx.commit("setLoadedFolders", res.data.data.folders);
            })
            .catch((err) => {
              ctx.commit("setLoadStatusLoadedTask", LoadingStatuses.Error);
              ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Error);
              ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Error);

              ctx.commit("setError", {
                message: err.response.data.message,
                status: err.response.status,
              });

              if (err.response.status == 401) {
                ctx.dispatch("logout", true);
              }
            });
        } else {
          ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Ready);
          ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Ready);
        }
      },
    },

    mutations: {
      setTasks(state, tasks) {
        state.tasks = tasks;
      },

      setMainFolder(state, mainFolder) {
        state.mainFolder = mainFolder;
      },

      setLoadedTask(state, loadedTask) {
        state.loadedTask = loadedTask;
      },

      setLoadedFiles(state, files) {
        state.loadedFiles = files;
      },

      setLoadedFolders(state, folders) {
        state.loadedFolders = folders;
      },

      setDates(state, dates) {
        state.dates = dates;
      },
    },
  };
};
