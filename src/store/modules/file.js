export default (api, router, LoadingStatuses) => {
  return {
    state: {
      loadedFile: "",
      extension: "",
      mode: "",
      typeFolders: "",
    },

    getters: {
      loadedFile: (state) => {
        return state.loadedFile;
      },

      typeFolders: (state) => {
        return state.typeFolders;
      },

      extension: (state) => {
        return state.extension;
      },

      mode: (state) => {
        return state.mode;
      },
    },

    actions: {
      async getTaskFile(
        ctx,
        data = {
          course: "",
          task: "",
          file: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Loading);
        await api.file
          .showTaskFile({
            course: data.course,
            task: data.task,
            file: data.file,
          })
          .then((res) => {
            if (!res.data.data.file)
              ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Ready);

            ctx.commit("setLoadedFile", res.data.data);
            ctx.commit("setExtension", res.data.data.file.extension);
            ctx.commit("setMode", res.data.data.file.extension.mode);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Error);

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

      async getDecisionFile(
        ctx,
        data = {
          course: "",
          task: "",
          decision: "",
          file: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Loading);
        await api.file
          .showDecisionFile({
            course: data.course,
            task: data.task,
            decision: data.decision,
            file: data.file,
          })
          .then((res) => {
            if (!res.data.data.file)
              ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Ready);

            ctx.commit("setLoadedFile", res.data.data);
            ctx.commit("setExtension", res.data.data.file.extension);
            ctx.commit("setMode", res.data.data.file.extension.mode);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Error);

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

      async destroyTaskFile(
        ctx,
        data = {
          course: "",
          task: "",
          file: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateFile", LoadingStatuses.Loading);
        await api.file
          .destroyTaskFile({
            course: data.course,
            task: data.task,
            file: data.file,
          })
          .then(() => {
            ctx.commit("setLoadStatusUpdateFile", LoadingStatuses.Ready);

            for (var i = 0; i < ctx.getters.loadedFiles.length; i++) {
              if (ctx.getters.loadedFiles[i].id === data.file) {
                ctx.getters.loadedFiles.splice(i, 1);
                break;
              }
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateFile", LoadingStatuses.Error);

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

      async destroyDecisionFile(
        ctx,
        data = {
          course: "",
          task: "",
          decision: "",
          file: "",
        }
      ) {
        ctx.commit("setLoadStatusUpdateFile", LoadingStatuses.Loading);
        await api.file
          .destroyDecisionFile({
            course: data.course,
            task: data.task,
            decision: data.decision,
            file: data.file,
          })
          .then(() => {
            ctx.commit("setLoadStatusUpdateFile", LoadingStatuses.Ready);

            for (var i = 0; i < ctx.getters.decisionFiles.length; i++) {
              if (ctx.getters.decisionFiles[i].id === data.file) {
                ctx.getters.decisionFiles.splice(i, 1);
                break;
              }
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateFile", LoadingStatuses.Error);

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

      async storeTaskFile(ctx, data) {
        ctx.commit("setLoadStatusStoreFile", LoadingStatuses.Loading);
        await api.file
          .storeTaskFile(data)
          .then(() => {
            ctx.commit("setLoadStatusStoreFile", LoadingStatuses.Ready);
            if (data.get("folder") == "") {
              ctx.dispatch("getMainFiles", {
                course: data.get("course"),
                task: data.get("task"),
              });
            } else {
              ctx.dispatch("getTaskFiles", {
                course: data.get("course"),
                task: data.get("task"),
                folder: data.get("folder"),
              });
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusStoreFile", LoadingStatuses.Error);
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

      async storeDecisionFile(ctx, data) {
        ctx.commit("setLoadStatusStoreFile", LoadingStatuses.Loading);
        await api.file
          .storeDecisionFile(data)
          .then(() => {
            ctx.commit("setLoadStatusStoreFile", LoadingStatuses.Ready);
            if (data.get("folder") == "") {
              ctx.dispatch("getAuthDecision", {
                course: data.get("course"),
                task: data.get("task"),
              });
            } else {
              ctx.dispatch("getDecisionFiles", {
                course: data.get("course"),
                task: data.get("task"),
                decision: data.get("decision"),
                folder: data.get("folder"),
              });
            }
          })
          .catch((err) => {
            console.log(err);
            ctx.commit("setLoadStatusStoreFile", LoadingStatuses.Error);
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
      setLoadedFile(state, loadedFile) {
        state.loadedFile = loadedFile;
      },

      setTypeFolders(state, typeFolders) {
        state.typeFolders = typeFolders;
      },

      setExtension(state, extension) {
        state.extension = extension;
      },

      setMode(state, mode) {
        state.mode = mode;
      },
    },
  };
};
