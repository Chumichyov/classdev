export default (api, router, LoadingStatuses) => {
  return {
    state: {
      belonging: "",
      current: "",
    },

    getters: {
      belonging: (state) => {
        return state.belonging;
      },

      current: (state) => {
        return state.current;
      },
    },

    actions: {
      // ???????????????????????????????????????????????????? folder
      async getTaskFiles(
        ctx,
        data = {
          course: "",
          task: "",
          folder: null,
        }
      ) {
        ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Loading);
        await api.folder
          .showTaskFiles({
            course: data.course,
            task: data.task,
            folder: data.folder,
          })
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Ready);

            if (res.data.data.belonging != null) {
              ctx.commit("setTypeFolders", "Task");
              ctx.commit("setLoadStatusLoadedMainFiles", null);
            } else {
              ctx.commit("setTypeFolders", "");
              ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Ready);
            }

            ctx.commit("setLoadedFiles", res.data.data.files);
            ctx.commit("setLoadedFolders", res.data.data.folders);
            ctx.commit("setBelonging", res.data.data.belonging);
            ctx.commit("setCurrent", data.folder);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Error);

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

      async getDecisionFiles(
        ctx,
        data = {
          course: "",
          task: "",
          decision: "",
          folder: null,
        }
      ) {
        ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Loading);
        await api.folder
          .showDecisionFiles(data)
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Ready);

            if (res.data.data.belonging != null) {
              ctx.commit("setTypeFolders", "Decision");
              ctx.commit("setLoadStatusLoadedMainFiles", null);
            } else {
              ctx.commit("setTypeFolders", "");
              ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Ready);
            }

            ctx.commit("setDecisionFiles", res.data.data.files);
            ctx.commit("setDecisionFolders", res.data.data.folders);
            ctx.commit("setBelonging", res.data.data.belonging);
            ctx.commit("setDecisionCurrent", data.folder);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Error);

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

      async folderTaskCreate(
        ctx,
        data = {
          course: "",
          task: "",
          folder: "",
          title: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Loading);
        await api.folder
          .folderTaskCreate({
            course: data.course,
            task: data.task,
            folder: data.folder,
            title: data.title,
          })
          .then((res) => {
            ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Ready);
            ctx.dispatch("getTaskFiles", {
              course: data.course,
              task: data.task,
              folder: res.data.data.main.id,
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

      async folderDecisionCreate(
        ctx,
        data = {
          course: "",
          task: "",
          decision: "",
          folder: "",
          title: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Loading);
        await api.folder
          .folderDecisionCreate({
            course: data.course,
            task: data.task,
            decision: data.decision,
            folder: data.folder,
            title: data.title,
          })
          .then((res) => {
            ctx.commit("pushDecisionFolders", res.data.data);
            ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Ready);
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

      async destroyTaskFolder(
        ctx,
        data = {
          course: "",
          task: "",
          folder: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Loading);
        await api.folder
          .destroyTaskFolder({
            course: data.course,
            task: data.task,
            folder: data.folder,
          })
          .then(() => {
            ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Ready);

            for (var i = 0; i < ctx.getters.loadedFolders.length; i++) {
              if (ctx.getters.loadedFolders[i].id === data.folder) {
                ctx.getters.loadedFolders.splice(i, 1);
                break;
              }
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Error);

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

      async destroyDecisionFolder(
        ctx,
        data = {
          course: "",
          task: "",
          decision: "",
          folder: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Loading);
        await api.folder
          .destroyDecisionFolder(data)
          .then(() => {
            ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Ready);

            for (var i = 0; i < ctx.getters.decisionFolders.length; i++) {
              if (ctx.getters.decisionFolders[i].id === data.folder) {
                ctx.getters.decisionFolders.splice(i, 1);
                break;
              }
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateFolder", LoadingStatuses.Error);

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

      async getMainFiles(
        ctx,
        data = {
          course: "",
          task: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Loading);
        await api.folder
          .showMainFiles({
            course: data.course,
            task: data.task,
          })
          .then((res) => {
            if (res.data.length == 0) {
              ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Empty);

              ctx.commit("setLoadedFiles", "");
              ctx.commit("setLoadedFolders", "");
              ctx.commit("setBelonging", "");
            } else {
              ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Ready);

              if (res.data.data.belonging != null) {
                ctx.commit("setTypeFolders", "");
                ctx.commit("setLoadStatusLoadedMainFiles", null);
              } else {
                ctx.commit("setTypeFolders", "");

                ctx.commit(
                  "setLoadStatusLoadedMainFiles",
                  LoadingStatuses.Ready
                );
              }

              ctx.commit("setLoadedFiles", res.data.data.files);
              ctx.commit("setLoadedFolders", res.data.data.folders);
              ctx.commit("setBelonging", res.data.data.belonging);
              ctx.commit("setCurrent", res.data.data.id);
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Error);

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
      setBelonging(state, belonging) {
        state.belonging = belonging;
      },

      setCurrent(state, current) {
        state.current = current;
      },
    },
  };
};
