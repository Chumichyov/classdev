export default function (instance) {
  return {
    showDecision(payload) {
      return instance.get(
        `/courses/${payload.course}/tasks/${payload.task}/decisions/${payload.decision}`,
        payload
      );
    },

    updateDecision(payload) {
      return instance.patch(
        `/courses/${payload.course}/tasks/${payload.task}/decisions/${payload.decision}`,
        payload
      );
    },

    showAuthDecision(payload) {
      return instance.get(
        `/courses/${payload.course}/tasks/${payload.task}/authDecision`,
        payload
      );
    },
  };
}
