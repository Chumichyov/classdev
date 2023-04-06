export default (api, router) => {
  return {
    state: {
      courses: [],
    },

    getters: {
      courses: (state) => {
        return state.courses;
      },
    },

    actions: {
      async indexCourses(ctx) {
        await api.course
          .indexCourses()
          .then((res) => {
            ctx.commit("setCourses", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.data.message,
              status: err.response.status,
            });
            if (err.response.status == 401) {
              ctx.dispatch("logout");
            }
            router.push("/error");
          });
      },

      async storeCourses(ctx, course) {
        await api.course
          .storeCourses(course)
          .then(() => {
            router.push("/main");
          })
          .catch((err) => {
            console.log(err);
            ctx.commit("setError", {
              message: err.response.data.message,
              status: err.response.status,
            });
            if (err.response.status == 401) {
              ctx.dispatch("logout");
            }
            router.push("/error");
          });
      },
    },

    mutations: {
      setCourses(state, courses) {
        state.courses = courses;
      },
    },
  };
};
