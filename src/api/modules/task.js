export default function (instance) {
  return {
    indexTasks(payload) {
      return instance.post(`courses/${payload.course}/tasks`, payload);
    },
  };
}
