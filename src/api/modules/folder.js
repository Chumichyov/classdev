export default function (instance) {
  return {
    showTaskFiles(payload) {
      return instance.get(
        `courses/${payload.course}/tasks/${payload.task}/folders/${payload.folder}`,
        payload
      );
    },

    showDecisionFiles(payload) {
      return instance.get(
        `courses/${payload.course}/tasks/${payload.task}/decisions/${payload.decision}/folders/${payload.folder}`,
        payload
      );
    },

    showMainFiles(payload) {
      return instance.get(
        `courses/${payload.course}/tasks/${payload.task}/mainFolder`,
        payload
      );
    },

    destroyTaskFolder(payload) {
      return instance.delete(
        `/courses/${payload.course}/tasks/${payload.task}/folders/${payload.folder}`,
        payload
      );
    },

    destroyDecisionFolder(payload) {
      return instance.delete(
        `/courses/${payload.course}/tasks/${payload.task}/decisions/${payload.decision}/folders/${payload.folder}`,
        payload
      );
    },

    folderTaskCreate(payload) {
      return instance.post(
        `/courses/${payload.course}/tasks/${payload.task}/folderCreate`,
        payload
      );
    },

    folderDecisionCreate(payload) {
      return instance.post(
        `/courses/${payload.course}/tasks/${payload.task}/decisions/${payload.decision}/folderCreate`,
        payload
      );
    },
  };
}
