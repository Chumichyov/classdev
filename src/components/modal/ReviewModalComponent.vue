<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
import {
  helpers,
  required,
  minLength,
  maxLength,
  integer,
} from "@vuelidate/validators";

export default {
  name: "ModalComponent",

  data: () => ({
    v$: useVuelidate(),
    workReview: {
      color: "",
      start: "",
      end: "",
      title: "",
      description: null,
    },
  }),

  props: {
    review: {
      type: Object,
      required: true,
    },
  },

  emits: ["highlight", "clear"],

  validations() {
    return {
      workReview: {
        title: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 36 символа",
            maxLength(36)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 2 символа",
            minLength(2)
          ),
        },
        color: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Цвет должен быть в формате HEX",
            maxLength(7)
          ),
          minLength: helpers.withMessage(
            "Цвет должен быть в формате HEX",
            minLength(7)
          ),
        },
        start: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          integer: helpers.withMessage("Введите номер строки", integer),
        },
        end: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          integer: helpers.withMessage(
            "Введите номер строки. Если строка одна, продублируйте поле начала.",
            integer
          ),
        },
        description: {
          maxLength: helpers.withMessage(
            "Максимальная длина: 768 символа",
            maxLength(768)
          ),
        },
      },
    };
  },

  mounted() {
    this.workReview.color = this.review.color;
    this.workReview.start = this.review.start;
    this.workReview.end = this.review.end;
    this.workReview.title = this.review.title;
    this.workReview.description = this.review.description;
  },

  computed: {
    ...mapGetters([
      "authUser",
      "loadedFile",
      "reviews",
      "isTeacher",
      "decision",
    ]),
  },

  methods: {
    hexToRgb(hex) {
      return hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (m, r, g, b) => "#" + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));
    },

    lineClear() {
      for (let index = 0; index < this.loadedFile.lines.length; index++) {
        document
          .getElementById(index + "line")
          .setAttribute("style", "background-color: transparent ");
      }
    },

    lineHighlight() {
      this.lineClear();

      this.reviews.forEach((review) => {
        let start = review.start;
        let end = review.end;
        let color = review.color;

        if (start == end) {
          document
            .getElementById(start + "line")
            .setAttribute(
              "style",
              "background-color: rgba(" +
                this.hexToRgb(color) +
                ", .1) !important"
            );
        } else {
          for (start; start <= end; start++) {
            document
              .getElementById(start + "line")
              .setAttribute(
                "style",
                "background-color: rgba(" +
                  this.hexToRgb(color) +
                  ", .1) !important"
              );
          }
        }
      });
    },

    resize() {
      let element = this.$refs["textareaModal"];
      const height = element.style.height;
      const scrollHeight = element.scrollHeight;

      if (scrollHeight > height.slice(0, -2))
        element.style.height = element.scrollHeight + 2 + "px";
    },

    updateReview(review) {
      this.v$.$validate("course");

      if (!this.v$.$error) {
        this.$store
          .dispatch("updateReview", {
            course: this.$route.params.course,
            task: this.$route.params.task,
            decision: this.$route.params.decision,
            file: this.$route.params.file,
            review: review,
            color: this.workReview.color,
            start: this.workReview.start,
            end: this.workReview.end,
            title: this.workReview.title,
            description: this.workReview.description,
          })
          .then(() => {
            this.lineHighlight();
          });
      }
    },

    deleteReview(review) {
      this.$store
        .dispatch("deleteReview", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          decision: this.$route.params.decision,
          file: this.$route.params.file,
          review: review,
        })
        .then(() => {
          this.lineHighlight();
        });
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    :id="'review-' + review.id"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-dark-1">
        <div class="modal-header border-0">
          <h5
            class="modal-title"
            :class="
              isTeacher && decision.completed && decision.completed.id == 2
                ? ' text-light'
                : 'text-primary'
            "
          >
            {{ isTeacher ? "Обзор" : review.title }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body py-0 border-0 text-light fw-normal"
          v-if="isTeacher && decision.completed && decision.completed.id == 2"
        >
          <div class="d-flex align-items-start">
            <input
              style="max-width: 32px; height: 32px"
              type="color"
              class="form-control p-1 border-gray-2 bg-transparent"
              list="defaultColors"
              id="colors"
              placeholder="Select Color"
              v-model="workReview.color"
            />
            <datalist
              id="defaultColors"
              class="background-dark-1 border-gray-2"
            >
              <option value="#00ff00"></option>
              <option value="#c8c164"></option>
              <option value="#c86464"></option>
            </datalist>
            <div class="flex-fill ms-3">
              <input
                class="form-control border-gray-2 bg-transparent text-light w-100"
                style="height: 32px"
                type="text"
                name="title"
                placeholder="Название"
                v-model="workReview.title"
              />
              <div class="text-danger points-1">
                {{
                  v$.workReview.title.$errors[0]
                    ? v$.workReview.title.$errors[0].$message
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="mt-3 d-flex align-items-start justify-content-between">
            <div class="flex-fill me-2">
              <input
                class="form-control border-gray-2 bg-transparent text-light w-100"
                style="height: 32px"
                type="text"
                name="title"
                placeholder="Начало"
                v-model="workReview.start"
              />
              <div class="text-danger points-1">
                {{
                  v$.workReview.start.$errors[0]
                    ? v$.workReview.start.$errors[0].$message
                    : ""
                }}
              </div>
            </div>
            <div class="flex-fill">
              <input
                class="form-control border-gray-2 bg-transparent text-light w-100"
                style="height: 32px"
                type="text"
                name="title"
                placeholder="Конец"
                v-model="workReview.end"
              />
              <div class="text-danger points-1">
                {{
                  v$.workReview.end.$errors[0]
                    ? v$.workReview.end.$errors[0].$message
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="mt-3">
            <textarea
              class="p-2 text-light background-dark-1 rounded form-control border-gray-2"
              type="text"
              name="name"
              ref="textareaModal"
              @input="resize()"
              @focus="resize()"
              style="min-height: 66px"
              placeholder="Описание"
              v-model="workReview.description"
            ></textarea>
            <div class="text-danger points-1">
              {{
                v$.workReview.description.$errors[0]
                  ? v$.workReview.description.$errors[0].$message
                  : ""
              }}
            </div>
          </div>
        </div>
        <div class="modal-body py-0 border-0 text-light fw-normal" v-else>
          <div class="">
            {{ review.description }}
          </div>
        </div>
        <div
          v-if="isTeacher && decision.completed && decision.completed.id == 2"
          class="modal-footer border-0 d-flex align-items-center justify-content-end m-0"
        >
          <button
            @click.prevent="deleteReview(review.id)"
            type="button"
            class="btn btn-danger m-0 me-3"
            data-bs-dismiss="modal"
          >
            Удалить
          </button>
          <button
            v-if="
              v$.$errors == '' &&
              workReview.title != '' &&
              workReview.title.length > 1 &&
              workReview.color != '' &&
              workReview.start != '' &&
              workReview.end != ''
            "
            @click.prevent="updateReview(review.id)"
            type="button"
            class="btn btn-primary m-0"
            data-bs-dismiss="modal"
          >
            Изменить
          </button>
          <button
            v-else
            @click.prevent="updateReview(review.id)"
            type="button"
            class="btn btn-primary m-0"
          >
            Изменить
          </button>
          <button
            type="button"
            class="btn btn-secondary m-0 ms-3"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
        <div
          v-else
          class="modal-footer border-0 d-flex align-items-center justify-content-end m-0"
        >
          <button
            type="button"
            class="btn btn-secondary m-0 ms-3"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
