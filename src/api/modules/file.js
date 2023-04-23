export default function (instance) {
  return {
    showTaskFile(payload) {
      return instance.get(
        `/courses/${payload.course}/tasks/${payload.task}/files/${payload.file}`,
        payload
      );
    },
  };
}
