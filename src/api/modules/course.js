export default function (instance) {
  return {
    indexCourses(payload) {
      return instance.post("courses", payload);
    },

    getCourse(course) {
      return instance.get(`courses/${course}`);
    },

    storeCourses(payload) {
      return instance.post("courses/store", payload);
    },

    destroyCourse(payload) {
      return instance.delete(`courses/${payload.course}`, payload);
    },

    updateCourse(payload) {
      return instance.patch(`courses/${payload.course}`, payload);
    },

    updateCode(payload) {
      return instance.patch(`courses/${payload.course}/settings/code`, payload);
    },

    updateLink(payload) {
      return instance.patch(`courses/${payload.course}/settings/link`, payload);
    },

    expelUser(payload) {
      return instance.delete(
        `courses/${payload.course}/users/${payload.user}/expel`,
        payload
      );
    },
  };
}
