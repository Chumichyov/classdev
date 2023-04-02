export default function (instance) {
  return {
    notifications(payload) {
      return instance.post("notifications", payload);
    },
  };
}
