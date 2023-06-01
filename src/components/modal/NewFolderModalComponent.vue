<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";

export default {
  name: "NewFolderModalComponent",

  data: () => ({
    v$: useVuelidate(),
    title: "",
  }),

  props: {
    type: {
      type: String,
      default: "Task",
      required: false,
    },
  },

  components: {},

  computed: {
    ...mapGetters([
      "loadedTask",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
      "current",
      "decisionCurrent",
      "decision",
    ]),
  },

  methods: {
    folderTaskCreate() {
      this.v$.$validate();

      if (!this.v$.$error) {
        this.$store
          .dispatch("folderTaskCreate", {
            course: this.$route.params.course,
            task: this.$route.params.task,
            title: this.title,
            folder: this.current,
          })
          .then(() => {
            this.title = "";
            this.v$.$reset();
            this.$refs.folderCreate.reset();
          });
      }
    },

    folderDecisionCreate() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$store
          .dispatch("folderDecisionCreate", {
            course: this.$route.params.course,
            task: this.$route.params.task,
            decision: this.decision.id,
            title: this.title,
            folder: this.decisionCurrent,
          })
          .then(() => {
            this.title = "";
            this.v$.$reset();
            this.$refs.folderCreate.reset();
          });
      }
    },
  },

  validations() {
    return {
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
    };
  },
};
</script>

<template>
  <!-- Новая папка -->
  <div
    class="modal fade"
    id="newFolder"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-dark-1">
        <div class="modal-header border-0">
          <h5 class="modal-title text-light">Новая папка</h5>
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
          @submit.prevent="
            type == 'Task' ? folderTaskCreate() : folderDecisionCreate()
          "
          ref="folderCreate"
        >
          <div class="modal-body py-0 border-0 text-light fw-normal">
            <div class="">
              <input
                type="text"
                class="form-control border-gray-2 rounded bg-transparent w-100 text-light"
                placeholder="Название папки"
                v-model="title"
              />
              <div
                class="text-danger"
                v-if="v$.title.$errors && v$.title.$errors[0]"
              >
                {{ v$.title.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div
            class="modal-footer border-0 d-flex align-items-center justify-content-end"
          >
            <button
              v-if="v$.title.$errors == '' && title != ''"
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
              class="btn btn-secondary ms-2"
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
