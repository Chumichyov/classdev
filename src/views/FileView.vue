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
  }),

  mounted() {
    if (this.loadStatusLoadedFile == "READY" && !this.isHighlighted) {
      this.lineHighlight();
      this.isHighlighted = true;
    }

    Prism.highlightAll();

    if (this.loadedFile == "") {
      this.$store.dispatch("getTaskFile", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        file: this.$route.params.file,
      });
    }

    if (this.loadedTask == "") {
      this.$store.dispatch("getTask", {
        course: this.$route.params.course,
        task: this.$route.params.task,
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
      "mainFolder",
    ]),
  },

  methods: {
    toCourse(course) {
      if (course != this.loadedCourse.id) {
        this.$store.dispatch("getCourse", course);
      }

      this.$store
        .dispatch("getTasks", {
          course: this.$route.params.course,
          type: "Date",
          search: "",
        })
        .then(() => {
          if (
            this.loadStatusLoadedCourse == "READY" &&
            (this.loadStatusLoadedTasks == "READY" ||
              this.loadStatusLoadedTasks == "EMPTY")
          ) {
            console.log(1);
            this.$router.push({
              name: "course.tasks",
              params: {
                course: course,
              },
            });
          }
        });
    },

    toTask() {
      this.$store.dispatch("getCourse", this.$route.params.course);

      this.$store
        .dispatch("getFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          folder: this.mainFolder.id,
        })
        .then(() => {
          if (
            (this.loadStatusLoadedFiles == "READY" ||
              this.loadStatusLoadedFiles == "EMPTY") &&
            this.loadStatusLoadedCourse == "READY"
          ) {
            this.$router.push({
              name: "task",
              params: {
                course: this.$route.params.course,
                task: this.$route.params.task,
              },
            });
          }
        });
    },

    lineHighlight() {
      // const ERROR = "marker-red";
      // const SUCCESS = "marker-green";
      // const DOUBTFUL = "marker-yellow";
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
  <div
    class="pt-4 text-light d-flex align-items-start justify-content-start position-relative"
  >
    <!-- <linear-preloader-component
      :load="loadStatusLoadedTask"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedFiles"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedFile"
    ></linear-preloader-component> -->

    <div class="flex-fill">
      <nav aria-label="breadcrumb" class="main-px">
        <ol class="breadcrumb">
          <li
            class="breadcrumb-item text-decoration-none cursor-pointer text-primary"
            @click.prevent="toCourse(this.$route.params.course)"
          >
            Курс
          </li>
          <li
            class="breadcrumb-item text-decoration-none cursor-pointer text-primary"
            @click.prevent="toTask()"
          >
            Задание
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
            v-if="loadStatusLoadedFile == 'READY'"
          >
            {{ loadedFile.file.original_name }}
          </li>
        </ol>
      </nav>

      <div class="main-px points-1 fs-4 pb-4 border-bottom border-gray-2">
        <div
          class="points-1"
          v-if="loadStatusLoadedTask === 'READY'"
          style="max-width: 768px; height: 39px"
        >
          {{ loadedTask.title }}
        </div>
      </div>

      <!-- content -->
      <div class="main-px mw-900 mt-4 mb-4">
        <div
          class="w-100 border border-gray-2 rounded-top p-3 d-flex align-items-center"
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
          ><div class="bg-transparent position-relative w-100 d-flex" :id="index + 'g'" v-for="(line, index) in loadedFile.lines" :key="line.id"><span class="text-end d-inline-block background-dark-1 text-gray-1" :style="loadedFile.lines.length - 1 >= 10 && loadedFile.lines.length - 1 < 100 ? 'width: 13.2px' : loadedFile.lines.length - 1 >= 100 && loadedFile.lines.length - 1 < 1000 ? 'width: 19.8px' : loadedFile.lines.length - 1 >= 1000 ? 'width: 26.39px' : ''" style="z-index: 1;" id="lineNumber">{{ index }}</span><code v-if="mode != null" class="me-2 w-100" :class="'lang-' +  mode.title" style="margin-left: 12px;">{{ line }}</code><code v-else class="me-2" :class="'lang-markup'" style="margin-left: 12px;">{{ line }}</code><div :id="index" class="top-0 bottom-0 start-0 end-0"></div></div></pre>
          <!-- <div
            :id="index"
            class="marker-green w-100"
            style="top: 8px; left: 0px; height: 180px"
          ></div> -->
          <!-- <div
            class="marker-green w-100"
            style="top: 96px; left: 0px; height: 360px"
          ></div> -->
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
      </div>
    </div>
  </div>
</template>
