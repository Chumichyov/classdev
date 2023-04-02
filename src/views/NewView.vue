<script>
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "NewView",
  data: () => ({
    course: {
      title: "",
      group: "",
      description: "",
    },
  }),

  methods: {
    storeCourses() {
      this.$store.dispatch("storeCourses", this.course);
    },
  },

  components: {
    InputComponent,
  },
};
</script>

<template>
  <div class="main-px mw-768">
    <div class="pt-5">
      <div class="text-light fs-4 pb-4 border-bottom border-gray-2">
        Создание нового курса
      </div>
      <form action="" class="pt-4" @submit.prevent="storeCourses">
        <div class="">
          <div class="d-flex">
            <input-component
              class=""
              style="width: 272px"
              :label="'Название курса'"
              v-model="course.title"
              type="text"
              name="name"
            ></input-component>
            <input-component
              class="ms-4"
              style="width: 120px"
              :label="'Группа'"
              v-model="course.group"
              type="text"
              name="name"
            ></input-component>
          </div>
          <input-component
            class="pt-3"
            :label="'Описание'"
            v-model="course.description"
            :remark="'Необязательно'"
            type="text"
            name="name"
          ></input-component>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Создать</button>
      </form>
    </div>
  </div>
</template>
