<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "NewMaterialModalComponent",

  data: () => ({
    v$: useVuelidate(),
    material: {
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
            type: 2,
            title: this.material.title,
            description: this.material.description,
          })
          .then(() => {
            this.$store.dispatch("getTasks", {
              course: this.$route.params.course,
              type: "Date",
              search: this.tasksSearch,
            });

            this.$refs.formMaterial.reset();

            this.material.title = "";
            this.material.description = "";
          });
      }
    },
  },

  validations() {
    return {
      material: {
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

        description: {
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
  <!-- Новый материал -->
  <div
    class="modal fade"
    id="newMaterial"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-dark-1">
        <div class="modal-header border-0">
          <h5 class="modal-title text-light">Новый материал</h5>
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
          @submit.prevent="storeTask"
          ref="formMaterial"
        >
          <div class="modal-body py-0 border-0 text-light fw-normal">
            <div class="">
              <input-component
                class="w-100"
                :label="'Название материала'"
                v-model="material.title"
                type="text"
                name="name"
                :error="v$.material.title.$errors"
              ></input-component>
              <div class="d-flex align-items-center mb-2">
                <div class="text-light">Описание</div>
              </div>
              <textarea
                class="p-2 text-light w-100 background-dark-1 rounded form-control border-gray-1"
                v-model="material.description"
                type="text"
                name="name"
                :error="v$.material.description.$errors"
              ></textarea>
            </div>
          </div>
          <div
            class="modal-footer mt-2 border-0 d-flex align-items-center justify-content-between"
          >
            <button
              v-if="v$.$errors == '' && material.title != ''"
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
