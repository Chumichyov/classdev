<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "NewTaskModalComponent",

  data: () => ({
    v$: useVuelidate(),
    task: {
      title: "",
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
      "tasksSearch",
    ]),
  },

  methods: {
    storeTask() {
      this.v$.$validate("task");

      if (!this.v$.$error) {
        this.$store
          .dispatch("storeTask", {
            course: this.$route.params.course,
            type: 1,
            title: this.task.title,
            description: this.task.description,
          })
          .then(() => {
            this.$store.dispatch("getTasks", {
              course: this.$route.params.course,
              type: "Date",
              search: this.tasksSearch,
            });
            this.$refs.formTask.reset();

            this.task.title = "";
            this.task.description = "";
          });
      }
    },
  },

  validations() {
    return {
      task: {
        title: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 64 символа",
            maxLength(64)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 4 символов",
            minLength(4)
          ),
        },
      },
    };
  },
};
</script>

<template>
  <!-- Новое задание -->
  <div
    class="modal fade"
    id="newTask"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-dark-1">
        <div class="modal-header border-0">
          <h5 class="modal-title text-light">Новое задание</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form action="" class="pt-2" @submit.prevent="storeTask" ref="formTask">
          <div class="modal-body py-0 border-0 text-light fw-normal">
            <div class="">
              <input-component
                class="w-100"
                :label="'Название задания'"
                v-model="task.title"
                type="text"
                name="name"
                :error="v$.task.title.$errors"
              ></input-component>
              <div class="d-flex align-items-center mb-2">
                <div class="text-light">Описание</div>
              </div>
              <textarea
                class="p-2 text-light w-100 background-dark-1 rounded form-control border-gray-1"
                v-model="task.description"
                type="text"
                name="name"
              ></textarea>
            </div>
          </div>
          <div
            class="modal-footer mt-2 border-0 d-flex align-items-center justify-content-between"
          >
            <button
              v-if="v$.$errors == '' && task.title != ''"
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
