export default function (instance) {
  return {
    indexTasks(payload) {
      return instance.post(`courses/${payload.course}/tasks`, payload);
    },

    storeTask(payload) {
      return instance.post(`courses/${payload.course}/tasks/store`, payload);
    },

    updateTask(payload) {
      return instance.patch(
        `courses/${payload.course}/tasks/${payload.task}`,
        payload
      );
    },

    published(payload) {
      return instance.patch(
        `courses/${payload.course}/tasks/${payload.task}/published`,
        payload
      );
    },

    destroyTask(payload) {
      return instance.delete(
        `courses/${payload.course}/tasks/${payload.task}`,
        payload
      );
    },

    showTask(payload) {
      return instance.get(
        `courses/${payload.course}/tasks/${payload.task}`,
        payload
      );
    },
  };
}
