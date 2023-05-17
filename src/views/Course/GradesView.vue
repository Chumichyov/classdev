<script>
import { mapGetters } from "vuex";

export default {
  name: "CourseGradesView",

  mounted() {
    if (!this.isTeacher) {
      this.$router.push({
        name: "error",
      });
    }
  },

  computed: {
    ...mapGetters(["isTeacher"]),
  },
};
</script>

<template>
  <div class="pt-4 mw-900 text-light position-relative">
    <div class="main-px">Grades</div>
  </div>
</template>
