export default function (instance) {
  return {
    notifications(payload) {
      return instance.get("notifications", payload);
    },
  };
}
