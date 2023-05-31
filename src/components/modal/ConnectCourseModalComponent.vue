<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";

export default {
  name: "NewCourseModalComponent",

  data: () => ({
    v$: useVuelidate(),
    code: "",
  }),

  components: {},

  computed: {
    ...mapGetters([
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
      "loadedCourse",
    ]),
  },

  methods: {
    connect() {
      this.$store
        .dispatch("codeConnection", {
          code: this.code,
        })
        .then(() => {
          if (this.loadedCourse) this.toCourse(this.loadedCourse.id);
        });
    },

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

  validations() {
    return {
      code: {
        required: helpers.withMessage("Поле не должно быть пустым", required),
        maxLength: helpers.withMessage(
          "Максимальная длина: 6 символов",
          maxLength(6)
        ),
        minLength: helpers.withMessage(
          "Минимальная длина: 6 символов",
          minLength(6)
        ),
      },
    };
  },
};
</script>

<template>
  <!-- Вступление -->
  <div
    class="modal fade"
    id="connectCourse"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-dark-1">
        <div class="modal-header border-0">
          <h5 class="modal-title text-light">Подключение к курсу</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body py-0 border-0 text-light fw-normal">
          <input
            class="form-control w-100 text-light bg-transparent border-gray-2"
            type="text"
            v-model="code"
            placeholder="Код вступления"
          />
          <div
            class="text-danger"
            v-if="v$.code.$errors != '' && v$.code.$errors[0]"
          >
            {{ v$.code.$errors[0].$message }}
          </div>
        </div>
        <div
          class="modal-footer mt-2 border-0 d-flex align-items-center justify-content-end"
        >
          <button
            type="submit"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click.prevent="connect()"
          >
            Вступить
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
