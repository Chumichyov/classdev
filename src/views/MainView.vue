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
  <div class="d-flex align-items-start justify-content-start">
    <div
      class="sidebar background-dark-2 h-100 main-px pt-4 w-100"
      style="max-width: 370px"
    >
      <div class="" v-for="course in courses" :key="course.id">
        <div class="d-flex">
          <!-- <img
            :src="
              'http://127.0.0.1:8001' + course.leader.information.photo_path
            "
            alt=""
          /> -->
          <span class="text-light fs-14 points">
            {{ course.title }}
          </span>
        </div>
      </div>
    </div>
    <div class="main main-px pt-4">
      <button class="btn btn-primary" @click.prevent="logout">Выйти</button>
    </div>
  </div>
</template>
