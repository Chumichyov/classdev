export default function (instance) {
  return {
    indexTasks(payload) {
      return instance.post(`courses/${payload.course}/tasks`, payload);
    },

    storeTask(payload) {
      return instance.post(`courses/${payload.course}/tasks/store`, payload);
    },

    showTask(payload) {
      return instance.get(
        `courses/${payload.course}/tasks/${payload.task}`,
        payload
      );
    },
  };
}
