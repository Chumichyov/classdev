<script>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "NewView",

  data: () => ({
    v$: useVuelidate(),
    course: {
      title: "",
      group: "",
      description: "",
    },
  }),

  methods: {
    storeCourses() {
      this.v$.$validate();

      if (!this.v$.$error) {
        this.$store.dispatch("storeCourses", this.course);
      }
    },
  },

  validations() {
    return {
      course: {
        title: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 24 символа",
            maxLength(24)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 6 символа",
            minLength(6)
          ),
        },

        group: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 16 символов",
            maxLength(16)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 2 символа",
            minLength(2)
          ),
        },

        description: {
          maxLength: helpers.withMessage(
            "Максимальная длина: 256 символа",
            maxLength(256)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 2 символов",
            minLength(2)
          ),
        },
      },
    };
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
              class="w-100"
              :label="'Название курса'"
              v-model="course.title"
              type="text"
              name="name"
              :error="v$.course.title.$errors"
            ></input-component>
            <input-component
              class="ms-4 w-100"
              style="max-width: 240px"
              :label="'Группа'"
              v-model="course.group"
              type="text"
              name="name"
              :error="v$.course.group.$errors"
            ></input-component>
          </div>
          <input-component
            class="pt-3"
            :label="'Описание'"
            v-model="course.description"
            :remark="'Необязательно'"
            type="text"
            name="name"
            :error="v$.course.description.$errors"
          ></input-component>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Создать</button>
      </form>
    </div>
  </div>
</template>
