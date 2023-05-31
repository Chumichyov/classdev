<script>
import { mapGetters } from "vuex";
import FileView from "./Task/FileView.vue";
import FoldersView from "./Task/FoldersView.vue";
import SettingsView from "./Task/SettingsView.vue";

export default {
  name: "TaskView",

  components: {
    FileView,
    FoldersView,
    SettingsView,
  },

  mounted() {
    if (this.loadedCourse == "") {
      this.$store.dispatch("getCourse", this.$route.params.course);
    }

    if (this.loadStatusLoadedDecision == null) {
      this.$store.dispatch("getAuthDecision", {
        course: this.$route.params.course,
        task: this.$route.params.task,
      });
    }

    if (this.loadStatusLoadedTasks != "READY") {
      this.$store.dispatch("getTasks", {
        course: this.$route.params.course,
        type: "Date",
        search: "",
      });
    }

    if (this.loadStatusLoadedTask != "READY") {
      this.$store.dispatch("getTask", {
        course: this.$route.params.course,
        task: this.$route.params.task,
      });

      if (!this.$route.params.folder) {
        this.$store.dispatch("getMainFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
        });
      }

      if (this.$route.params.folder) {
        this.$store.dispatch("getTaskFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          folder: this.$route.params.folder,
        });
      }
    }
  },

  computed: {
    ...mapGetters([
      "decisionFiles",
      "decisionFolders",
      "decision",
      "decisions",
      "isTeacher",
      "loadedTask",
      "loadedCourse",
      "loadStatusLoadedTask",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedFile",
      "loadStatusLoadedFiles",
      "loadStatusLoadedDecision",
      "loadedFile",
      "mainFolder",
      "authUser",
    ]),
  },

  methods: {
    type() {
      return this.$route.meta.type;
    },

    toCourse(course) {
      if (course != this.loadedCourse.id) {
        this.$store.dispatch("getCourse", course);

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
              this.$router.push({
                name: "course.tasks",
                params: {
                  course: course,
                },
              });
            }
          });
      } else {
        this.$router.push({
          name: "course.tasks",
          params: {
            course: course,
          },
        });
      }
    },

    toTask() {
      if (this.$route.params.course != this.loadedCourse.id) {
        this.$store.dispatch("getCourse", this.$route.params.course);
      }

      this.$store.dispatch("getAuthDecision", {
        course: this.$route.params.course,
        task: this.$route.params.task,
      });

      this.$store
        .dispatch("getMainFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
        })
        .then(() => {
          this.$router.push({
            name: "task",
            params: {
              course: this.$route.params.course,
              task: this.$route.params.task,
            },
          });
        });
    },

    toSettings() {
      this.$router.push({
        name: "task.settings",
        params: {
          course: this.$route.params.course,
          task: this.$route.params.task,
        },
      });
    },

    toDecision(decision) {
      this.$store
        .dispatch("showDecision", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          decision: decision,
        })
        .then(() => {
          this.$router.push({
            name: "decision",
            params: {
              course: this.$route.params.course,
              task: this.$route.params.task,
              decision: decision,
            },
          });
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
            v-if="loadedTask"
            class="breadcrumb-item"
            :class="
              this.$route.name == 'file' ||
              this.$route.name == 'task.settings' ||
              this.$route.name == 'fileDecision'
                ? 'text-primary  cursor-pointer'
                : 'text-gray-1'
            "
            aria-current="page"
            @click.prevent="
              this.$route.name == 'file' ||
              this.$route.name == 'task.settings' ||
              this.$route.name == 'fileDecision'
                ? toTask()
                : ''
            "
          >
            {{ loadedTask.type.title }}
          </li>
          <li
            class="breadcrumb-item text-decoration-none cursor-pointer text-primary"
            aria-current="page"
            v-if="
              loadStatusLoadedFile == 'READY' &&
              this.$route.name == 'fileDecision' &&
              isTeacher
            "
            @click.prevent="
              toDecision(
                decision.id != null ? decision.id : this.$route.params.decision
              )
            "
          >
            Решение
          </li>
          <li
            v-if="this.$route.name == 'task.settings'"
            class="breadcrumb-item text-gray-1"
            aria-current="page"
          >
            Настройки
          </li>
          <li
            class="breadcrumb-item text-gray-1"
            aria-current="page"
            v-if="
              loadStatusLoadedFile == 'READY' &&
              (this.$route.name == 'file' || this.$route.name == 'fileDecision')
            "
          >
            {{ loadedFile.file.original_name }}
          </li>
        </ol>
      </nav>

      <div class="main-px fs-4 pb-4 border-bottom border-gray-2">
        <div
          class="points-1 d-flex align-items-center"
          v-if="loadStatusLoadedTask === 'READY'"
          style="max-width: 768px; height: 39px"
        >
          <div
            :class="
              this.$route.name == 'task.settings'
                ? 'text-gray-1'
                : 'text-primary cursor-pointer'
            "
            class="d-flex align-items-center justify-content-center me-2"
            v-if="authUser != '' && authUser.id == loadedCourse.leader.id"
            @click.prevent="toSettings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
              />
            </svg>
          </div>
          <div class="points-1">
            {{ loadedTask.title }}
          </div>
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
          <div class="" v-else-if="type() == 'SettingsView'">
            <settings-view></settings-view>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
