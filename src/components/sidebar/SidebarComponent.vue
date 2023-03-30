<script>
import InputComponent from "../InputComponent.vue";

export default {
  name: "SidebarComponent",

  data: () => ({
    query: "",
  }),

  props: {
    courses: {
      type: Array,
      required: true,
    },
  },

  components: {
    InputComponent,
  },
};
</script>

<template>
  <div
    class="sidebar background-dark-2 main-px pt-4 w-100 h-100"
    style="max-width: 330px"
  >
    <div class="mb-4">
      <div class="d-flex align-items-center justify-content-between text-light">
        <div class="">Курсы</div>
        <button class="btn btn-primary px-2 py-1">Создать</button>
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
        <span class="text-light fs-14 points ms-2">
          {{ course.title }}
        </span>
      </div>
    </div>
  </div>
</template>
