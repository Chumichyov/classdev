<script>
import { mapGetters } from "vuex";

export default {
  name: "MainView",

  mounted() {
    this.$store.dispatch("allCourses");
  },

  computed: {
    ...mapGetters(["courses"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<template>
  <div class="mt-3" v-for="course in courses" :key="course.id">
    {{ course.title }}
  </div>
  <button class="btn btn-primary mt-3 ms-3" @click.prevent="logout">
    Выйти
  </button>
</template>
