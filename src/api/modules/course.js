export default function (instance) {
  return {
    indexCourses(payload) {
      return instance.post("courses", payload);
    },

    getCourse(course) {
      return instance.get(`courses/${course}`);
    },

    getMembers(course) {
      return instance.get(`courses/${course}/members`);
    },

    linkConnection(payload) {
      return instance.post(`connection/${payload.link}`);
    },

    codeConnection(payload) {
      return instance.post(`connection`, payload);
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
