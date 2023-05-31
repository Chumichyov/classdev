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
import ReviewModalComponent from "@/components/modal/ReviewModalComponent.vue";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";
import "prismjs/plugins/file-highlight/prism-file-highlight.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-c";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-json";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";

export default {
  name: "FileView",

  components: {
    ReviewModalComponent,
  },

  data: () => ({
    v$: useVuelidate(),
    isHighlighted: false,

    review: {
      color: "#00ff00",
      start: "",
      end: "",
      title: "",
      description: null,
    },

    viewReviews: [],
  }),

  validations() {
    return {
      review: {
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
    this.getViewReview();

    if (this.loadStatusLoadedFile == "READY" && !this.isHighlighted) {
      this.lineHighlight();
      this.isHighlighted = true;
    }

    Prism.highlightAll();

    if (this.loadedFile == "") {
      if (!this.$route.params.decision) {
        this.$store.dispatch("getTaskFile", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          file: this.$route.params.file,
        });
      } else {
        this.$store.dispatch("showDecision", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          decision: this.$route.params.decision,
        });

        this.$store.dispatch("getDecisionFile", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          decision: this.$route.params.decision,
          file: this.$route.params.file,
        });
      }
    }

    if (this.loadedTask == "") {
      this.$store.dispatch("getTask", {
        course: this.$route.params.course,
        task: this.$route.params.task,
      });
    }

    if (this.loadStatusLoadedReviews == null) {
      this.$store.dispatch("getReviews", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        decision: this.$route.params.decision,
        file: this.$route.params.file,
      });
    }
  },

  computed: {
    ...mapGetters([
      "mode",
      "loadedTask",
      "loadedFile",
      "loadedCourse",
      "loadStatusLoadedTask",
      "loadStatusLoadedTasks",
      "loadStatusLoadedCourse",
      "loadStatusLoadedFiles",
      "loadStatusLoadedFile",
      "loadStatusLoadedReviews",
      "mainFolder",
      "isTeacher",
      "reviews",
      "decision",
    ]),
  },

  methods: {
    getViewReview() {
      console.log(1);
      this.viewReviews = [];
      this.reviews.forEach((el) => {
        this.viewReviews.push({
          start: el.start,
          end: el.end,
          color: this.hexToRgb(el.color),
        });
      });
    },

    resize(ref) {
      let element =
        this.$refs[ref][0] == undefined ? this.$refs[ref] : this.$refs[ref][0];
      const height = element.style.height;
      const scrollHeight = element.scrollHeight;
      if (scrollHeight > height.slice(0, -2))
        element.style.height = element.scrollHeight + 2 + "px";
    },

    storeReview() {
      this.v$.$validate("course");

      if (!this.v$.$error) {
        this.$store
          .dispatch("storeReview", {
            course: this.$route.params.course,
            task: this.$route.params.task,
            decision: this.$route.params.decision,
            file: this.$route.params.file,
            color: this.review.color,
            start: this.review.start,
            end: this.review.end,
            title: this.review.title,
            description: this.review.description,
          })
          .then(() => {
            this.$store
              .dispatch("getReviews", {
                course: this.$route.params.course,
                task: this.$route.params.task,
                decision: this.$route.params.decision,
                file: this.$route.params.file,
              })
              .then(() => {
                this.getViewReview();
                this.lineHighlight();

                this.v$.$reset();
                this.review.start = "";
                this.review.end = "";
                this.review.title = "";
                this.review.description = "";
              });
          });
      }
    },

    updateReview(index) {
      this.$store
        .dispatch("updateReview", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          decision: this.$route.params.decision,
          file: this.$route.params.file,
          review: this.reviews[index].id,
          color: this.reviews[index].color,
          start: this.reviews[index].start,
          end: this.reviews[index].end,
          title: this.reviews[index].title,
          description: this.reviews[index].description,
        })
        .then(() => {
          this.getViewReview();
          this.lineHighlight();
        });
    },

    deleteReview(index) {
      this.$store
        .dispatch("deleteReview", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          decision: this.$route.params.decision,
          file: this.$route.params.file,
          review: this.reviews[index].id,
        })
        .then(() => {
          this.getViewReview();
          this.lineHighlight();
        });
    },

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
        delete document.getElementById(index + "line").dataset.bsTarget;
        delete document.getElementById(index + "line").dataset.bsToggle;
        // document.getElementById(index + "line").dataset.bsTarget = null;
        // document.getElementById(index + "line").dataset.bsToggle = null;
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
          document.getElementById(start + "line").dataset.bsTarget =
            "#review-" + review.id;
          document.getElementById(start + "line").dataset.bsToggle = "modal";
          document
            .getElementById(start + "line")
            .setAttribute(
              "style",
              "background-color: rgba(" +
                this.hexToRgb(color) +
                ", .1) !important; cursor: pointer"
            );
        } else {
          for (start; start <= end; start++) {
            document.getElementById(start + "line").dataset.bsTarget =
              "#review-" + review.id;
            document.getElementById(start + "line").dataset.bsToggle = "modal";
            document
              .getElementById(start + "line")
              .setAttribute(
                "style",
                "background-color: rgba(" +
                  this.hexToRgb(color) +
                  ", .1) !important; cursor: pointer"
              );
          }
        }
      });
    },
  },
};
</script>

<template>
  <review-modal-component
    v-on:highlight="lineHighlight"
    v-on:clear="lineClear"
    v-for="review in reviews"
    :key="review.id"
    :review="review"
  ></review-modal-component>
  <div class="main-px mw-900 mt-4 mb-4">
    <div
      class="w-100 border border-bottom-0 border-gray-2 rounded-top px-3 py-2 d-flex align-items-center"
    >
      <div class="">
        <span class="fs-5" v-if="loadStatusLoadedFile == 'READY'">
          {{ loadedFile.file.original_name }}
        </span>
      </div>
      <div
        class="ms-auto text-primary cursor-pointer"
        v-if="loadStatusLoadedFile == 'READY' && mode != null"
      >
        {{ mode.title }}
      </div>
      <div class="ms-auto text-primary cursor-pointer" v-else>markup</div>
    </div>
    <div
      id="codeViewer"
      class="position-relative background-dark-1 border border-gray-2 rounded-bottom p-2 ps-3"
    >
      <pre
        v-if="
          loadStatusLoadedFile == 'READY' &&
          (loadedFile.lines.length > 1 || loadedFile.lines[0] != '')
        "
        class="w-100 line-numbers position-relative"
        style="max-height: 551px; margin-bottom: 0px"
      ><div class="bg-transparent position-relative w-100 d-flex align-items-start" :id="index + 'line'" v-for="(line, index) in loadedFile.lines" :key="line.id"><div class="d-flex align-items-center justify-content-end text-end d-inline-block text-gray-1" :style="loadedFile.lines.length - 1 >= 10 && loadedFile.lines.length - 1 < 100 ? 'width: 13.2px' : loadedFile.lines.length - 1 >= 100 && loadedFile.lines.length - 1 < 1000 ? 'width: 19.8px' : loadedFile.lines.length - 1 >= 1000 ? 'width: 26.39px' : ''" style="z-index: 1; height: 20.38px;" id="lineNumber"><span>{{ index }}</span></div><code v-if="mode != null" class="me-2 w-100" :class="'lang-' +  mode.title" style="margin-left: 12px;">{{ line }}</code><code v-else class="me-2" :class="'lang-markup'" style="margin-left: 12px;">{{ line }}</code><div :id="index" class="top-0 bottom-0 start-0 end-0"></div></div></pre>

      <div
        class="p-3 w-100 text-center fs-5"
        v-if="
          loadStatusLoadedFile == 'READY' &&
          (loadedFile.lines.length < 1 || loadedFile.lines[0] == '')
        "
      >
        Файл пустой
      </div>
    </div>
    <div
      class="mt-4"
      v-if="
        isTeacher &&
        this.$route.name == 'fileDecision' &&
        decision.completed &&
        decision.completed.id == 2
      "
    >
      <!-- <label for="colors" class="form-label"> Select Color </label> -->
      <div class="d-flex align-items-center justify-content-between pb-2">
        <div class="fs-5">Создание рецензии</div>
        <button
          class="btn btn-primary px-2 py-1"
          @click.prevent="storeReview()"
        >
          Создать
        </button>
      </div>
      <div class="d-flex align-items-start">
        <input
          style="max-width: 32px; height: 32px"
          type="color"
          class="form-control p-1 border-gray-2 bg-transparent"
          list="defaultColors"
          id="colors"
          placeholder="Select Color"
          v-model="review.color"
        />
        <datalist id="defaultColors" class="background-dark-1 border-gray-2">
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
            v-model="review.title"
          />
          <div class="text-danger points-1">
            {{
              v$.review.title.$errors[0]
                ? v$.review.title.$errors[0].$message
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
            v-model="review.start"
          />
          <div class="text-danger points-1">
            {{
              v$.review.start.$errors[0]
                ? v$.review.start.$errors[0].$message
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
            v-model="review.end"
          />
          <div class="text-danger points-1">
            {{
              v$.review.end.$errors[0] ? v$.review.end.$errors[0].$message : ""
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
          @input="resize('textareaModal')"
          @focus="resize('textareaModal')"
          style="min-height: 66px"
          placeholder="Описание"
          v-model="review.description"
        ></textarea>
        <div class="text-danger points-1">
          {{
            v$.review.description.$errors[0]
              ? v$.review.description.$errors[0].$message
              : ""
          }}
        </div>
      </div>
    </div>
    <div
      class="d-flex align-items-center justify-content-between mt-4"
      v-if="reviews != ''"
    >
      <div class="fs-5">Рецензии</div>
    </div>
    <div
      class="d-flex align-items-start"
      :class="index == 0 ? 'mt-3' : 'mt-4'"
      v-for="(loopReview, index) in reviews"
      :key="loopReview.id"
    >
      <!-- <div
        class="border rounded-circle d-flex align-items-center justify-content-center border-2 position-absolute top-0 start-0 background-dark-1"
        style="
          width: 24px;
          height: 24px;
          font-size: 12px;
          margin: -12px 0 0 -12px;
        "
        :style="
          'border-color: rgba(' +
          this.hexToRgb(loopReview.color) +
          ', .2) !important'
        "
      >
        {{ this.viewReviews[index] ? this.viewReviews[index].start : "" }}
      </div>
      <div
        class="border rounded-circle d-flex align-items-center justify-content-center border-2 position-absolute bottom-0 start-0 background-dark-1"
        style="
          width: 24px;
          height: 24px;
          font-size: 12px;
          margin-bottom: -12px;
          margin-left: -12px;
        "
        :style="
          'border-color: rgba(' +
          this.hexToRgb(loopReview.color) +
          ', .2) !important'
        "
      >
        {{ this.viewReviews[index] ? this.viewReviews[index].end : "" }}
      </div> -->
      <div
        class="d-flex flex-column align-items-center justify-content-between"
        style="align-self: stretch"
      >
        <div
          class="border rounded-circle d-flex align-items-center justify-content-center border-2"
          style="width: 24px; height: 24px; font-size: 12px"
          :style="
            'border-color: rgba(' +
            this.hexToRgb(loopReview.color) +
            ', .2) !important'
          "
        >
          {{ this.viewReviews[index] ? this.viewReviews[index].start : "" }}
        </div>
        <div
          class="rounded flex-fill"
          style="width: 2px"
          :style="
            'background-color: rgba(' +
            this.hexToRgb(loopReview.color) +
            ', .2) !important'
          "
        ></div>
        <div
          class="border rounded-circle d-flex align-items-center justify-content-center border-2"
          style="width: 24px; height: 24px; font-size: 12px"
          :style="
            'border-color: rgba(' +
            this.hexToRgb(loopReview.color) +
            ', .2) !important'
          "
        >
          {{ this.viewReviews[index] ? this.viewReviews[index].end : "" }}
        </div>
      </div>
      <div
        class="w-100 ms-3 py-2"
        v-if="isTeacher && decision.completed && decision.completed.id == 2"
      >
        <div class="d-flex align0items-center flex-fill">
          <input
            class="form-control border-gray-2 bg-transparent text-light flex-fill"
            style="height: 32px"
            type="text"
            name="title"
            placeholder="Название"
            v-model="loopReview.title"
          />
          <input
            class="form-control border-gray-2 bg-transparent text-light flex-fill ms-2"
            style="height: 32px; max-width: 60px"
            type="text"
            name="title"
            placeholder="Начало"
            v-model="loopReview.start"
          />
          <input
            class="form-control border-gray-2 bg-transparent text-light flex-fill ms-2"
            style="height: 32px; max-width: 60px"
            type="text"
            name="title"
            placeholder="Конец"
            v-model="loopReview.end"
          />
        </div>
        <div class="d-flex align-items-start justify-content-between mt-2">
          <textarea
            class="p-2 text-light background-dark-1 rounded form-control border-gray-2 flex-fill"
            type="text"
            name="name"
            :ref="'textarea' + loopReview.id"
            @focus="resize('textarea' + loopReview.id)"
            @input="resize('textarea' + loopReview.id)"
            style="min-height: 90px"
            placeholder="Описание"
            v-model="loopReview.description"
          ></textarea>
          <div class="d-flex flex-column ms-2" style="align-self: stretch">
            <input
              type="color"
              style="width: 24px"
              class="form-control border-gray-2 p-1 bg-transparent flex-fill rounded"
              list="defaultColors"
              id="colors"
              placeholder="Select Color"
              v-model="loopReview.color"
            />
          </div>
          <datalist
            id="defaultColors"
            class="background-dark-1 border-gray-2 rounded"
          >
            <option value="#00ff00"></option>
            <option value="#c8c164"></option>
            <option value="#c86464"></option>
          </datalist>
        </div>
        <div class="d-flex align-items-center justify-content-end mt-2">
          <button
            class="btn btn-danger px-2 py-1"
            @click.prevent="deleteReview(index)"
          >
            Удалить
          </button>
          <button
            class="btn btn-primary px-2 py-1 ms-2"
            @click.prevent="updateReview(index)"
          >
            Изменить
          </button>
        </div>
      </div>
      <div class="ms-3 py-3" v-else>
        <div class="text-primary fw-bold points-1" style="">
          {{ loopReview.title }}
        </div>
        <div class="mt-1">{{ loopReview.description }}</div>
      </div>
    </div>
    <!-- <div class="d-flex align-items-center flex-wrap me-3" v-if="isTeacher">
      <div
        data-bs-toggle="modal"
        :data-bs-target="'#review-' + review.id"
        :style="
          'background-color: rgba(' +
          this.hexToRgb(review.color) +
          ', .1) !important'
        "
        class="ms-3 mt-3 px-3 py-1 rounded cursor-pointer text-light"
        v-for="review in reviews"
        :key="review.id"
      >
        <span v-if="review.start == review.end">{{ review.start }}</span>
        <span v-else>{{ review.start }}-{{ review.end }}</span>
      </div>
    </div> -->
  </div>
</template>
