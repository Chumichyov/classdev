export default (api, router, LoadingStatuses) => {
  return {
    state: {
      loadedFile: "",
      extension: "",
      mode: "",
      typeFolders: "",

      reviews: [],
    },

    getters: {
      loadedFile: (state) => {
        return state.loadedFile;
      },

      reviews: (state) => {
        return state.reviews;
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

      async storeReview(ctx, data) {
        ctx.commit("setLoadStatusStoreReview", LoadingStatuses.Loading);
        await api.file
          .storeReview(data)
          .then(() => {
            ctx.commit("setLoadStatusStoreReview", LoadingStatuses.Ready);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusStoreReview", LoadingStatuses.Error);
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

      async getReviews(ctx, data) {
        if (data.decision != undefined) {
          ctx.commit("setLoadStatusLoadedReviews", LoadingStatuses.Loading);
          await api.file
            .getReviews(data)
            .then((res) => {
              ctx.commit("setLoadStatusLoadedReviews", LoadingStatuses.Ready);
              ctx.commit("setReviews", res.data.data);
            })
            .catch((err) => {
              ctx.commit("setLoadStatusLoadedReviews", LoadingStatuses.Error);
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
        } else {
          ctx.commit("setReviews", []);
        }
      },

      async updateReview(ctx, data) {
        ctx.commit("setLoadStatusUpdateReview", LoadingStatuses.Loading);
        await api.file
          .updateReview(data)
          .then((res) => {
            ctx.commit("setLoadStatusUpdateReview", LoadingStatuses.Ready);
            for (var i = 0; i < ctx.getters.reviews.length; i++) {
              if (ctx.getters.reviews[i].id === data.review) {
                ctx.getters.reviews[i] = res.data.data;
                break;
              }
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateReview", LoadingStatuses.Error);
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

      async deleteReview(ctx, data) {
        ctx.commit("setLoadStatusUpdateReview", LoadingStatuses.Loading);
        await api.file
          .deleteReview(data)
          .then(() => {
            for (var i = 0; i < ctx.getters.reviews.length; i++) {
              if (ctx.getters.reviews[i].id === data.review) {
                ctx.getters.reviews.splice(i, 1);
                break;
              }
            }

            ctx.commit("setLoadStatusUpdateReview", LoadingStatuses.Ready);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateReview", LoadingStatuses.Error);
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

      setReviews(state, reviews) {
        state.reviews = reviews;
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
