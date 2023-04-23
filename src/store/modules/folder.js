export default (api, router, LoadingStatuses) => {
  return {
    state: {
      belonging: "",
    },

    getters: {
      belonging: (state) => {
        return state.belonging;
      },
    },

    actions: {
      async getFiles(
        ctx,
        data = {
          course: "",
          task: "",
          folder: null,
        }
      ) {
        ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Loading);
        await api.folder
          .showFiles({
            course: data.course,
            task: data.task,
            folder: data.folder,
          })
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Ready);

            if (res.data.data.belonging != null)
              ctx.commit("setLoadStatusLoadedMainFiles", null);
            else
              ctx.commit("setLoadStatusLoadedMainFiles", LoadingStatuses.Ready);

            ctx.commit("setLoadedFiles", res.data.data.files);
            ctx.commit("setLoadedFolders", res.data.data.folders);
            ctx.commit("setBelonging", res.data.data.belonging);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedFiles", LoadingStatuses.Error);

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
      setBelonging(state, belonging) {
        state.belonging = belonging;
      },
    },
  };
};
