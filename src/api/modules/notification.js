export default function (instance) {
  return {
    notifications(payload) {
      return instance.post("notifications", payload);
    },

    notificationsDefault(payload) {
      return instance.post("notifications/default", payload);
    },

    read(payload) {
      return instance.patch(
        `notifications/${payload.notification}/read`,
        payload
      );
    },
  };
}
