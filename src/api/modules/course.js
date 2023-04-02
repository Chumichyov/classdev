export default function (instance) {
  return {
    indexCourses(payload) {
      return instance.get("courses", payload);
    },
    storeCourses(payload) {
      return instance.post("courses", payload);
    },
  };
}
