<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "NewCourseModalComponent",

  data: () => ({
    v$: useVuelidate(),
    course: {
      title: "",
      group: "",
      description: "",
    },
  }),

  components: {
    InputComponent,
  },

  computed: {
    ...mapGetters([
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
    ]),
  },

  methods: {
    storeCourses() {
      this.v$.$validate("course");

      if (!this.v$.$error) {
        this.$store.dispatch("storeCourses", this.course).then(() => {
          this.course.title = "";
          this.course.group = "";
          this.course.description = "";

          this.$refs.storeCourse.reset();
        });
      }
    },
  },

  validations() {
    return {
      course: {
        title: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 36 символа",
            maxLength(36)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 4 символа",
            minLength(4)
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
            "Максимальная длина: 768 символа",
            maxLength(768)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 2 символов",
            minLength(2)
          ),
        },
      },
    };
  },
};
</script>

<template>
  <!-- Новый курс -->
  <div
    class="modal fade"
    id="newCourse"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-dark-1">
        <div class="modal-header border-0">
          <h5 class="modal-title text-light">Новый курс</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form
          action=""
          class="pt-2"
          @submit.prevent="storeCourses"
          ref="storeCourse"
        >
          <div class="modal-body py-0 border-0 text-light fw-normal">
            <div class="">
              <input-component
                class="w-100"
                :label="'Название курса'"
                v-model="course.title"
                type="text"
                name="name"
                :error="v$.course.title.$errors"
              ></input-component>
              <input-component
                class="w-100"
                style="max-width: 240px"
                :label="'Группа'"
                v-model="course.group"
                type="text"
                name="name"
                :error="v$.course.group.$errors"
              ></input-component>
              <div class="d-flex align-items-center mb-2">
                <div class="text-light">Описание</div>
              </div>
              <textarea
                class="p-2 text-light w-100 background-dark-1 rounded form-control border-gray-1"
                v-model="course.description"
                type="text"
                name="name"
                :error="v$.course.description.$errors"
              ></textarea>
            </div>
          </div>
          <div
            class="modal-footer mt-2 border-0 d-flex align-items-center justify-content-between"
          >
            <button
              v-if="
                v$.$errors == '' && course.title != '' && course.group != ''
              "
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Создать
            </button>
            <button v-else type="submit" class="btn btn-primary">
              Создать
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
