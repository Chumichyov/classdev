export default (api, router, LoadingStatuses) => {
  return {
    state: {
      courses: [],

      loadedCourse: [],
    },

    getters: {
      courses: (state) => {
        return state.courses;
      },

      loadedCourse: (state) => {
        return state.loadedCourse;
      },
    },

    actions: {
      async indexCourses(ctx) {
        ctx.commit("setLoadStatusCourses", LoadingStatuses.Loading);
        await api.course
          .indexCourses()
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusCourses", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusCourses", LoadingStatuses.Ready);

            ctx.commit("setCourses", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusCourses", LoadingStatuses.Error);

            ctx.commit("setError", {
              message: err.response.data.message,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async getCourse(ctx, course) {
        ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Loading);
        await api.course
          .getCourse(course)
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Empty);
            else ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Ready);

            ctx.commit("setLoadedCourse", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.data.message,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async storeCourses(ctx, course) {
        await api.course
          .storeCourses(course)
          .then(() => {
            router.push("/main");
          })
          .catch((err) => {
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
      setCourses(state, courses) {
        state.courses = courses;
      },

      setLoadedCourse(state, loadedCourse) {
        state.loadedCourse = loadedCourse;
      },
    },
  };
};
