export default function (instance) {
  return {
    signIn(payload) {
      return instance.post("login", payload);
    },
    signUp(payload) {
      return instance.post("register", payload);
    },
    logout() {},
  };
}
