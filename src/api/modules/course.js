export default function (instance) {
  return {
    indexCourses(payload) {
      return instance.get("courses", payload);
    },

    getCourse(course) {
      return instance.get(`courses/${course}`);
    },

    storeCourses(payload) {
      return instance.post("courses", payload);
    },
  };
}
