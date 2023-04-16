export default function (instance) {
  return {
    showFiles(payload) {
      return instance.get(
        `courses/${payload.course}/tasks/${payload.task}/folders/${payload.folder}`,
        payload
      );
    },
  };
}
