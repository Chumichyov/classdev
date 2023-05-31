<script>
import { mapGetters } from "vuex";

export default {
  name: "ConnectionView",

  computed: {
    ...mapGetters(["loadedCourse"]),
  },

  mounted() {
    this.$store
      .dispatch("linkConnection", {
        link: this.$route.params.link,
      })
      .then(() => {
        if (this.loadedCourse) this.toCourse(this.loadedCourse.id);
        else
          this.$router.push({
            name: "main",
          });
      });
  },

  methods: {
    toCourse(course) {
      this.$store.dispatch("getCourses");
      this.$store.dispatch("getCourse", course);
      this.$store
        .dispatch("getTasks", {
          course: course,
          type: "Date",
          search: "",
        })
        .then(() => {
          this.$router.push({
            name: "course.tasks",
            params: {
              course: course,
            },
          });
        });
    },
  },
};
</script>

<template>
  <div>111111</div>
</template>
