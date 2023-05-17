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
      if (!this.$route.params.decision) {
        this.$store.dispatch("getTaskFile", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          file: this.$route.params.file,
        });
      } else {
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
      ><div class="bg-transparent position-relative w-100 d-flex align-items-start" :id="index + 'g'" v-for="(line, index) in loadedFile.lines" :key="line.id"><div class="d-flex align-items-center justify-content-end text-end d-inline-block background-dark-1 text-gray-1" :style="loadedFile.lines.length - 1 >= 10 && loadedFile.lines.length - 1 < 100 ? 'width: 13.2px' : loadedFile.lines.length - 1 >= 100 && loadedFile.lines.length - 1 < 1000 ? 'width: 19.8px' : loadedFile.lines.length - 1 >= 1000 ? 'width: 26.39px' : ''" style="z-index: 1; height: 20.38px;" id="lineNumber"><span>{{ index }}</span></div><code v-if="mode != null" class="me-2 w-100" :class="'lang-' +  mode.title" style="margin-left: 12px;">{{ line }}</code><code v-else class="me-2" :class="'lang-markup'" style="margin-left: 12px;">{{ line }}</code><div :id="index" class="top-0 bottom-0 start-0 end-0"></div></div></pre>

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
</template>
