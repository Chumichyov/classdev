export default (api, router, LoadingStatuses) => {
  return {
    state: {
      tasks: [],

      loadedTask: "",
      tasksSearch: "",

      loadedFiles: [],
      loadedFolders: [],
      mainFolder: [],

      createdTask: "",

      dates: [],
    },

    getters: {
      tasksSearch: (state) => {
        return state.tasksSearch;
      },

      createdTask: (state) => {
        return state.createdTask;
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
        ctx.commit("setLoadStatusLoadedTasks", LoadingStatuses.Loading);
        await api.task
          .indexTasks({
            course: data.course,
            type: data.type,
            search: data.search,
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
          ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Loading);
          await api.task
            .showTask({
              course: data.course,
              task: data.task,
            })
            .then((res) => {
              if (res.data.data.length == 0) {
                ctx.commit("setLoadStatusLoadedTask", LoadingStatuses.Empty);
                ctx.commit(
                  "setLoadStatusLoadedMainFiles",
                  LoadingStatuses.Empty
                );
              } else {
                ctx.commit("setLoadStatusLoadedTask", LoadingStatuses.Ready);
                ctx.commit(
                  "setLoadStatusLoadedMainFiles",
                  LoadingStatuses.Ready
                );
                ctx.commit("setBelonging", "");
                ctx.commit("setCurrent", "");
              }

              if (res.data.data.decision)
                ctx.commit("setDecisions", res.data.data.decision);
              else ctx.commit("setDecisions", "");

              ctx.commit("setLoadedTask", res.data.data);

              ctx.commit("setMainFolder", res.data.data.folders[0]);
            })
            .catch((err) => {
              ctx.commit("setLoadStatusLoadedTask", LoadingStatuses.Error);
              // ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Error);
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
            description: data.description,
          })
          .then((res) => {
            ctx.commit("setCreatedTask", res.data.data);
            // if (res.data.data.length == 0)
            //   ctx.commit("setLoadStatusCreateTask", LoadingStatuses.Empty);
            // else ctx.commit("setLoadStatusCreateTask", LoadingStatuses.Ready);
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

      async updateTask(
        ctx,
        data = {
          title: "",
          description: "",
          course: "",
          task: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateTask", LoadingStatuses.Loading);
        await api.task
          .updateTask({
            title: data.title,
            course: data.course,
            task: data.task,
            description: data.description != "" ? data.description : "",
          })
          .then(() => {
            ctx.commit("setLoadStatusUpdateTask", LoadingStatuses.Ready);

            ctx.getters.loadedTask.title = data.title;
            ctx.getters.loadedTask.description = data.description;
            ctx.getters.tasks.forEach((element) => {
              if (element.id == data.task) {
                element.title = data.title;
                element.description = data.description;
              }
            });
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

      async destroyTask(
        ctx,
        data = {
          course: "",
          task: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateTask", LoadingStatuses.Loading);
        await api.task
          .destroyTask({
            course: data.course,
            task: data.task,
          })
          .then(() => {
            ctx.commit("setLoadStatusUpdateTask", LoadingStatuses.Ready);

            ctx
              .dispatch("getTasks", {
                course: data.course,
                search: "",
                type: "Date",
              })
              .then(() => {
                router.push({
                  name: "course.tasks",
                  params: {
                    course: data.course,
                  },
                });

                ctx.commit("setLoadedTask", "");
              });
          })
          .catch((err) => {
            console.log(err);
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

      async published(
        ctx,
        data = {
          course: "",
          task: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateTask", LoadingStatuses.Loading);
        await api.task
          .published({
            course: data.course,
            task: data.task,
          })
          .then(() => {
            ctx.commit("setLoadStatusUpdateTask", LoadingStatuses.Ready);

            ctx.getters.loadedTask.is_published =
              ctx.getters.loadedTask.is_published == 0 ? 1 : 0;

            ctx.dispatch("getTasks", {
              course: data.course,
              type: "Date",
              search: "",
            });
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
      setTasks(state, tasks) {
        state.tasks = tasks;
      },

      setCreatedTask(state, createdTask) {
        state.createdTask = createdTask;
      },

      pushTasks(state, task) {
        state.tasks.push(task);
      },

      unshiftTasks(state, task) {
        state.tasks.unshift(task);
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
