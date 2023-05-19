<script>
import { mapGetters } from "vuex";
// import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";

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
    // LinearPreloaderComponent,
  },

  data: () => ({
    // highlights: [
    //   { first: 6, type: "Error", message: "Some Error" },
    //   { first: 4, type: "Success", message: "Some Success" },
    // ],
    isHighlighted: false,

    review: {
      color: "#00ff00",
      start: "",
      end: "",
      title: "",
      description: null,
    },
  }),

  mounted() {
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
    ]),
  },

  methods: {
    resize() {
      let element = this.$refs["textarea"];
      const height = element.style.height;
      const scrollHeight = element.scrollHeight;

      if (scrollHeight > height.slice(0, -2))
        element.style.height = element.scrollHeight + "px";
    },

    storeReview() {
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
              this.lineHighlight();
            });

          this.review.start = "";
          this.review.end = "";
          this.review.title = "";
          this.review.description = "";
        });
    },

    lineHighlight() {
      const hexToRgb = (hex) =>
        hex
          .replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            (m, r, g, b) => "#" + r + r + g + g + b + b
          )
          .substring(1)
          .match(/.{2}/g)
          .map((x) => parseInt(x, 16));

      this.reviews.forEach((review) => {
        let start = review.start;
        let end = review.end;
        let color = review.color;

        if (start == end) {
          document
            .getElementById(start + "line")
            .setAttribute(
              "style",
              "background-color: rgba(" + hexToRgb(color) + ", .1) !important"
            );
        } else {
          console.log(1);
        }
      });
      // this.highlights.forEach((highlight) => {
      //   let first = highlight.first;
      //   let last = highlight.last;
      //   let type =
      //     highlight == "error"
      //       ? ERROR
      //       : highlight == "success"
      //       ? SUCCESS
      //       : DOUBTFUL;
      //   if (last == null) {
      //     document.getElementById(first).classList.add(type);
      //   }
      // });
    },
  },
};
</script>

<template>
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
      class="mt-3 py-2 pb-3"
      v-if="isTeacher && this.$route.name == 'fileDecision'"
    >
      <!-- <label for="colors" class="form-label"> Select Color </label> -->
      <div class="px-3 fs-5 pb-3">Рецензия</div>
      <div class="px-3 d-flex align-items-center">
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

        <input
          class="form-control border-gray-2 bg-transparent text-light flex-fill ms-3"
          style="height: 32px"
          type="text"
          name="title"
          placeholder="Название"
          v-model="review.title"
        />
      </div>
      <div class="mt-3 d-flex align-items-center justify-content-between px-3">
        <input
          class="form-control border-gray-2 bg-transparent text-light flex-fill me-2"
          style="height: 32px"
          type="text"
          name="title"
          placeholder="Начало"
          v-model="review.start"
        /><input
          class="form-control border-gray-2 bg-transparent text-light flex-fill ms-2"
          style="height: 32px"
          type="text"
          name="title"
          placeholder="Конец"
          v-model="review.end"
        />
      </div>
      <div class="px-3 mt-3">
        <textarea
          class="p-2 text-light background-dark-1 rounded form-control border-gray-2"
          type="text"
          name="name"
          ref="textarea"
          @input="resize()"
          @focus="resize()"
          style="min-height: 66px"
          placeholder="Описание"
          v-model="review.description"
        ></textarea>
      </div>
      <div class="px-3 w-100 text-end mt-3">
        <button class="btn btn-primary" @click.prevent="storeReview()">
          Создать рецензию
        </button>
      </div>
    </div>
  </div>
</template>
