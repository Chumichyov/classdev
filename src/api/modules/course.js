export default function (instance) {
  return {
    allCourses(payload) {
      return instance.get("courses", payload);
    },
  };
}
