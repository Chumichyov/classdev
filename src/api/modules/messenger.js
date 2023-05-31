export default function (instance) {
  return {
    messengers(payload) {
      return instance.get(`courses/${payload.course}/messengers`, payload);
    },

    search(payload) {
      return instance.post(`courses/${payload.course}/messengers`, payload);
    },

    messenger(payload) {
      return instance.get(
        `courses/${payload.course}/messengers/${payload.messenger}`,
        payload
      );
    },

    storeMessage(payload) {
      return instance.post(
        `courses/${payload.course}/messengers/${payload.messenger}`,
        payload
      );
    },
  };
}
