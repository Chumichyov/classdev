export default (api, router, LoadingStatuses) => {
  return {
    state: {
      decision: [],
      decisions: [],
      decisionFiles: [],
      decisionFolders: [],
      decisionCurrent: [],
    },

    getters: {
      decision: (state) => {
        return state.decision;
      },

      decisions: (state) => {
        return state.decisions;
      },

      decisionCurrent: (state) => {
        return state.decisionCurrent;
      },

      decisionFiles: (state) => {
        return state.decisionFiles;
      },

      decisionFolders: (state) => {
        return state.decisionFolders;
      },
    },

    actions: {
      async getAuthDecision(
        ctx,
        data = {
          course: "",
          task: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Loading);
        await api.decision
          .showAuthDecision(data)
          .then((res) => {
            if (res.data.data.length == 0) {
              ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Empty);
            } else {
              ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Ready);

              ctx.commit("setBelonging", "");
              ctx.commit("setTypeFolders", "");
              ctx.commit("setDecisionCurrent", res.data.data.folder.id);

              ctx.commit("setDecision", res.data.data.decision);

              ctx.commit("setDecisionFolders", res.data.data.folders);
              ctx.commit("setDecisionFiles", res.data.data.files);
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Error);

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

      async showDecision(
        ctx,
        data = {
          course: "",
          task: "",
          decision: "",
        }
      ) {
        ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Loading);
        await api.decision
          .showDecision(data)
          .then((res) => {
            if (res.data.data.length == 0) {
              ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Empty);
            } else {
              ctx.commit("setBelonging", "");
              ctx.commit("setTypeFolders", "");
              ctx.commit("setDecisionCurrent", res.data.data.folder.id);

              ctx.commit("setDecision", res.data.data.decision);
              ctx.commit("setDecisionFolders", res.data.data.folders);
              ctx.commit("setDecisionFiles", res.data.data.files);
              ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Ready);
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedDecision", LoadingStatuses.Error);

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

      async updateDecision(
        ctx,
        data = {
          course: "",
          task: "",
          decision: "",
          description: "",
          grade: null,
          completed: null,
        }
      ) {
        ctx.commit("setLoadStatusUpdateDecision", LoadingStatuses.Loading);
        await api.decision
          .updateDecision(data)
          .then((res) => {
            if (res.data.data.length == 0) {
              ctx.commit("setLoadStatusUpdateDecision", LoadingStatuses.Empty);
            } else {
              ctx.commit("setLoadStatusUpdateDecision", LoadingStatuses.Ready);
            }

            ctx.dispatch("getMembers", data.course);
            ctx.commit("setDecision", res.data.data);

            for (var i = 0; i < ctx.getters.decisions.length; i++) {
              if (ctx.getters.decisions[i].id == res.data.data.id)
                ctx.getters.decisions[i] = res.data.data;
            }
          })
          .catch((err) => {
            ctx.commit("setLoadStatusUpdateDecision", LoadingStatuses.Error);

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
      setDecision(state, decision) {
        state.decision = decision;
      },

      setDecisions(state, decisions) {
        state.decisions = decisions;
      },

      setDecisionFolders(state, decisionFolders) {
        state.decisionFolders = decisionFolders;
      },

      pushDecisionFolders(state, decisionFolders) {
        state.decisionFolders.push(decisionFolders);
      },

      setDecisionFiles(state, decisionFiles) {
        state.decisionFiles = decisionFiles;
      },

      setDecisionCurrent(state, decisionCurrent) {
        state.decisionCurrent = decisionCurrent;
      },
    },
  };
};
