export default (api, router, LoadingStatuses) => {
  return {
    state: {
      tasks: [],

      loadedTask: "",
      tasksSearch: "",

      loadedFiles: [],
      loadedFolders: [],
      mainFolder: [],

      dates: [],
    },

    getters: {
      tasksSearch: (state) => {
        return state.tasksSearch;
      },

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
      async getTasks(
        ctx,
        data = {
          course: "",
          type: "Date",
          search: "",
        }
      ) {
        // if (
        //   ctx.getters.loadedCourse.id != data.course ||
        //   ctx.getters.loadStatusLoadedTasks != "READY"
        // ) {
        ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Loading);
        await api.task
          .indexTasks({
            course: data.course,
            type: data.type,
            search: data.search,
          })
          .then((res) => {
            console.log(res.data.data);
            if (res.data.data.tasks.length == 0)
              ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Ready);

            ctx.commit("setTasks", res.data.data.tasks);
            ctx.commit("setDates", res.data.data.dates);
          })
          .catch((err) => {
            console.log(err);
            ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Error);

            ctx.commit("setError", {
              message: err.response.statusText,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }

            router.push({
              name: "error",
            });
          });
        // } else {
        //   ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Ready);
        // }
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
                message: err.response.statusText,
                status: err.response.status,
              });

              if (err.response.status == 401) {
                ctx.dispatch("logout", true);
              }

              router.push({
                name: "error",
              });
            });
        } else {
          ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Ready);
          ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Ready);
        }
      },

      async storeTask(
        ctx,
        data = {
          title: "",
          course: "",
          type: "",
          description: "",
        }
      ) {
        // ctx.commit("setLoadStatusCreateTask", LoadingStatuses.Loading);
        await api.task
          .storeTask({
            title: data.title,
            course: data.course,
            type: data.type,
            description: data.description != "" ? data.description : "",
          })
          .then(() => {
            // if (res.data.data.length == 0)
            //   ctx.commit("setLoadStatusCreateTask", LoadingStatuses.Empty);
            // else ctx.commit("setLoadStatusCreateTask", LoadingStatuses.Ready);
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.statusText,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }

            router.push({
              name: "error",
            });
          });
      },
    },

    mutations: {
      setTasks(state, tasks) {
        state.tasks = tasks;
      },

      pushTasks(state, task) {
        state.tasks.push(task);
      },

      setTasksSearch(state, tasksSearch) {
        state.tasksSearch = tasksSearch;
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
