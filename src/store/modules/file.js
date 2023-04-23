export default (api, router, LoadingStatuses) => {
  return {
    state: {
      loadedFile: "",
      extension: "",
      mode: "",
    },

    getters: {
      loadedFile: (state) => {
        return state.loadedFile;
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
            console.log(res);
            if (!res.data.data.file)
              ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Ready);

            ctx.commit("setLoadedFile", res.data.data);
            ctx.commit("setExtension", res.data.data.file.extension);
            ctx.commit("setMode", res.data.data.file.extension.mode);
          })
          .catch((err) => {
            console.log(err);
            ctx.commit("setLoadStatusLoadedFile", LoadingStatuses.Error);

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
      setLoadedFile(state, loadedFile) {
        state.loadedFile = loadedFile;
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
