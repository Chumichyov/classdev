<script>
import { mapGetters } from "vuex";
import FileView from "./Task/FileView.vue";
import FoldersView from "./Task/FoldersView.vue";

export default {
  name: "TaskView",

  components: {
    FileView,
    FoldersView,
  },

  mounted() {
    if (this.loadedCourse == "") {
      this.$store.dispatch("getCourse", this.$route.params.course);
    }

    if (this.loadStatusLoadedTask != "READY") {
      this.$store
        .dispatch("getTask", {
          course: this.$route.params.course,
          task: this.$route.params.task,
        })
        .then(() => {
          if (!this.$route.params.folder) {
            this.$store.dispatch("getFiles", {
              course: this.$route.params.course,
              task: this.$route.params.task,
              folder: this.mainFolder.id,
            });
          }
        });

      if (this.$route.params.folder) {
        this.$store.dispatch("getFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          folder: this.$route.params.folder,
        });
      }
    }
  },

  computed: {
    ...mapGetters([
      "loadedTask",
      "loadedCourse",
      "loadStatusLoadedTask",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedFile",
      "loadStatusLoadedFiles",
      "loadedFile",
      "mainFolder",
    ]),
  },

  methods: {
    type() {
      return this.$route.meta.type;
    },

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
  },
};
</script>

<template>
  <div
    class="pt-4 text-light d-flex align-items-start justify-content-start position-relative"
  >
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
            class="breadcrumb-item"
            :class="
              this.$route.name == 'file'
                ? 'text-primary  cursor-pointer'
                : 'active'
            "
            aria-current="page"
            @click.prevent="toTask()"
          >
            Задание
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
            v-if="loadStatusLoadedFile == 'READY' && this.$route.name == 'file'"
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
      <div class="">
        <transition name="slide-fade" mode="out-in">
          <div class="" v-if="type() == 'FoldersView'">
            <folders-view></folders-view>
          </div>
          <div class="" v-else-if="type() == 'FileView'">
            <file-view></file-view>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
