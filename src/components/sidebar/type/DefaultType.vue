<script>
import { mapGetters } from "vuex";
import InputComponent from "../../InputComponent.vue";

export default {
  name: "DefaultType",

  data: () => ({
    query: "",
  }),

  mounted() {
    this.$store.dispatch("indexCourses");
  },

  computed: {
    ...mapGetters(["courses"]),
  },

  components: {
    InputComponent,
  },
};
</script>

<template>
  <div class="h-100">
    <div class="mb-4">
      <div class="d-flex align-items-center justify-content-between text-light">
        <div class="">Курсы</div>
        <router-link to="/new" class="btn btn-primary px-2 py-1"
          >Создать</router-link
        >
      </div>
      <form action="" class="mt-3">
        <input-component type="text" name="search" v-model="query" />
      </form>
    </div>
    <div class="" v-for="(course, index) in courses" :key="course.id">
      <div
        class="d-flex align-items-center justify-content-start"
        :class="index > 0 ? 'mt-2' : ''"
      >
        <img
          class="rounded-circle position-relative w-100"
          style="max-width: 21px; max-height: 21px"
          :src="this.$url + course.leader.information.photo_path"
          alt=""
        />
        <span class="text-light fs-14 points-1 ms-2">
          {{ course.title }}
        </span>
      </div>
    </div>
  </div>
</template>
