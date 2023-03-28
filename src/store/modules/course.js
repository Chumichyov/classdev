// export default (Auth, api, router) => {
//   return {
//     state: {
//       courses: [
//         {
//           title: "",
//           description: "",
//           leader: {
//             name: "",
//             surname: "",
//             email: "",
//           },
//         },
//       ],

//       httpError: {
//         code: "404",
//         message: "Страница не найдена",
//       },
//     },

//     getters: {
//       courses: (state) => {
//         return state.courses;
//       },
//       httpError: (state) => {
//         return state.httpError;
//       },
//     },

//     actions: {
//       async allCourses(ctx) {
//         await api.course
//           .allCourses()
//           .then((res) => {
//             ctx.commit("setCourses", res.data.data);
//           })
//           .catch((err) => {
//             ctx.commit("setHttpError", {
//               code: err.response.status,
//               message: err.response.data.message,
//             });

//             if (err.response.data.code == 401) {
//               location.reload;

//               Auth.logout();
//             }

//             router.push({
//               name: "error",
//             });
//           });
//       },
//     },

//     mutations: {
//       setCourses(state, courses) {
//         state.courses = courses;
//       },
//       setHttpError(state, httpError) {
//         state.httpError = httpError;
//       },
//     },
//   };
// };
