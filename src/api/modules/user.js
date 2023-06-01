export default function (instance) {
  return {
    authUser(payload) {
      return instance.post("user", payload);
    },

    userUpdate(payload) {
      return instance.patch(`user/${payload.user}/update`, payload);
    },

    imageUpdate(payload) {
      return instance.post(`user/${payload.get("user")}/update`, payload);
    },
  };
}
