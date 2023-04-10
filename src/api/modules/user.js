export default function (instance) {
  return {
    authUser(payload) {
      return instance.post("user", payload);
    },
  };
}
