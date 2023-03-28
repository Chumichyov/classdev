// export default (Auth, api, router) => {
//   return {
//     state: {
//       auth: {
//         email: "",
//         name: "",
//         surname: "",
//         password: "",
//         password_confirmation: "",
//       },

//       // authUser: {
//       //   user: {
//       //     email: "",
//       //     name: "",
//       //     surname: "",
//       //   },

//       //   token: "",
//       // },

//       error: {
//         message: "",
//         code: "",
//       },
//     },

//     getters: {
//       auth: (state) => {
//         return state.auth;
//       },
//       error: (state) => {
//         return state.error;
//       },
//       // authUser: (state) => {
//       //   return state.authUser;
//       // },
//     },

//     actions: {
//       async signIn(ctx, auth) {
//         await api.auth
//           .signIn({
//             email: auth.email,
//             password: auth.password,
//           })
//           .then((res) => {
//             Auth.login(res.data.token, res.data.user);
//             router.push("/main");
//           })
//           .catch(
//             (err) => console.log(err)

//             // ctx.commit("setError", {
//             //   message: err.response.data.errors.message,
//             //   code: err.response.status,
//             // });
//           );
//       },
//       async signUp(ctx, auth) {
//         await api.auth
//           .signUp({
//             email: auth.email,
//             name: auth.name,
//             surname: auth.surname,
//             password: auth.password,
//             password_confirmation: auth.password_confirmation,
//           })
//           .then((res) => {
//             Auth.login(res.data.token, res.data.user);
//             router.push("/main");
//           })
//           .catch(
//             (err) => console.log(err)
//             // ctx.commit("setError", {
//             //   message: err.response.data.errors.message,
//             //   code: err.response.status,
//             // })
//           );
//       },

//       async logout() {
//         Auth.logout();
//         router.push("/login");
//       },
//     },

//     mutations: {
//       setAuth(state, auth) {
//         state.auth = auth;
//       },
//       setError(state, error) {
//         state.error = error;
//       },
//       // setAuthUser(state, authUser) {
//       //   state.authUser = authUser;
//       // },
//     },
//   };
// };
