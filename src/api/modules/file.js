export default function (instance) {
  return {
    showTaskFile(payload) {
      return instance.get(
        `/courses/${payload.course}/tasks/${payload.task}/files/${payload.file}`,
        payload
      );
    },

    showDecisionFile(payload) {
      return instance.get(
        `/courses/${payload.course}/tasks/${payload.task}/decisions/${payload.decision}/files/${payload.file}`,
        payload
      );
    },

    destroyTaskFile(payload) {
      return instance.delete(
        `/courses/${payload.course}/tasks/${payload.task}/files/${payload.file}`,
        payload
      );
    },

    destroyDecisionFile(payload) {
      return instance.delete(
        `/courses/${payload.course}/tasks/${payload.task}/decisions/${payload.decision}/files/${payload.file}`,
        payload
      );
    },

    storeTaskFile(payload) {
      return instance.post(
        `/courses/${payload.get("course")}/tasks/${payload.get("task")}/files`,
        payload
      );
    },

    storeDecisionFile(payload) {
      return instance.post(
        `/courses/${payload.get("course")}/tasks/${payload.get(
          "task"
        )}/decisions/${payload.get("decision")}/files`,
        payload
      );
    },
  };
}
