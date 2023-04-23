export default (api, router, LoadingStatuses) => {
  return {
    state: {
      courses: [],

      loadedCourse: [],

      loadedCourseInformation: [],

      leaderPhotoPath: [],

      coursesSearch: "",
    },

    getters: {
      courses: (state) => {
        return state.courses;
      },

      leaderPhotoPath: (state) => {
        return state.leaderPhotoPath;
      },

      loadedCourseInformation: (state) => {
        return state.loadedCourseInformation;
      },

      coursesSearch: (state) => {
        return state.coursesSearch;
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

      async indexCoursesSearch(ctx) {
        ctx.commit("setLoadStatusLoadedCourses", LoadingStatuses.Loading);
        await api.course
          .indexCourses({
            search: ctx.getters.coursesSearch,
          })
          .then((res) => {
            if (res.data.data.length == 0)
              ctx.commit("setLoadStatusLoadedCourses", LoadingStatuses.Empty);
            else
              ctx.commit("setLoadStatusLoadedCourses", LoadingStatuses.Ready);

            ctx.commit("setCourses", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setLoadStatusLoadedCourses", LoadingStatuses.Error);

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

      async getCourse(ctx, course) {
        ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Loading);
        if (ctx.getters.loadedCourse.id != course) {
          await api.course
            .getCourse(course)
            .then((res) => {
              if (res.data.data.length == 0)
                ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Empty);
              else
                ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Ready);

              ctx.commit("setLoadedCourse", res.data.data);
              ctx.commit(
                "setLoadedCourseInformation",
                res.data.data.information
              );
              ctx.commit(
                "setLeaderPhotoPath",
                res.data.data.leader.information.photo_path
              );
            })
            .catch((err) => {
              ctx.commit("setLoadStatusLoadedCourse", LoadingStatuses.Error);
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
        }
      },

      async storeCourses(ctx, course) {
        ctx.commit("setLoadStatusCreateCourse", LoadingStatuses.Loading);
        await api.course
          .storeCourses(course)
          .then((res) => {
            ctx.commit("setLoadStatusCreateCourse", LoadingStatuses.Ready);
            ctx.commit("pushCourses", res.data.data);
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.statusText,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async updateCode(ctx, course) {
        await api.course
          .updateCode(course)
          .then((res) => {
            ctx.getters.loadedCourse.information.code = res.data.data.code;
            ctx.getters.loadedCourseInformation.code = res.data.data.code;
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.statusText,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async updateLink(ctx, course) {
        await api.course
          .updateLink(course)
          .then((res) => {
            ctx.getters.loadedCourse.information.link = res.data.data.link;
            ctx.getters.loadedCourseInformation.link = res.data.data.link;
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.statusText,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async destroyCourse(
        ctx,
        data = {
          course: "",
        }
      ) {
        await api.course
          .destroyCourse(data)
          .then(() => {
            ctx.commit("setLoadedCourse", "");
            for (var i = 0; i < ctx.getters.courses.length; i++) {
              if (ctx.getters.courses[i].id == data.course) {
                ctx.getters.courses.splice(i, 1);
                break;
              }
            }

            router.push({
              name: "main",
            });
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.statusText,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async expelUser(
        ctx,
        data = {
          course: "",
          user: "",
        }
      ) {
        await api.course
          .expelUser(data)
          .then((res) => {
            console.log(res);
            console.log(ctx.getters.loadedCourse.members.length);
            for (var i = 0; i < ctx.getters.loadedCourse.members.length; i++) {
              if (ctx.getters.loadedCourse.members[i].id === data.user) {
                ctx.getters.loadedCourse.members.splice(i, 1);
                break;
              }
            }
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.statusText,
              status: err.response.status,
            });

            if (err.response.status == 401) {
              ctx.dispatch("logout", true);
            }
          });
      },

      async updateCourse(
        ctx,
        data = {
          course: "",
          title: "",
          description: "",
        }
      ) {
        await api.course
          .updateCourse(data)
          .then((res) => {
            ctx.commit("setLoadedCourseTitle", res.data.data.title);
            ctx.commit("setLoadedCourseDescription", res.data.data.description);

            ctx.getters.courses.forEach((element) => {
              if (element.id == data.course) {
                element.title = data.title;
                element.description = data.description;
              }
            });
          })
          .catch((err) => {
            ctx.commit("setError", {
              message: err.response.statusText,
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

      setLoadedCourseInformation(state, loadedCourseInformation) {
        state.loadedCourseInformation = loadedCourseInformation;
      },

      setLoadedCourseTitle(state, title) {
        state.loadedCourse.title = title;
      },

      setLoadedCourseDescription(state, description) {
        state.loadedCourse.description = description;
      },

      setCoursesSearch(state, coursesSearch) {
        state.coursesSearch = coursesSearch;
      },

      setLeaderPhotoPath(state, leaderPhotoPath) {
        state.leaderPhotoPath = leaderPhotoPath;
      },

      pushCourses(state, course) {
        state.courses.push(course);
      },

      setLoadedCourse(state, loadedCourse) {
        state.loadedCourse = loadedCourse;
      },
    },
  };
};
