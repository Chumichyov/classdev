<script>
import { mapGetters, mapMutations } from "vuex";
import NewMaterialModalComponentVue from "@/components/modal/NewMaterialModalComponent.vue";
import NewTaskModalComponent from "@/components/modal/NewTaskModalComponent.vue";
// import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import Popper from "vue3-popper";

import GradesView from "./Course/GradesView.vue";
import MembersView from "./Course/MembersView.vue";
import MessengerView from "./Course/MessengerView.vue";
import SettingsView from "./Course/SettingsView.vue";
import TasksView from "./Course/TasksView.vue";
import ChatView from "./Messenger/ChatView.vue";

export default {
  name: "CourseView",

  data: () => ({
    isLoaded: false,
    search: "",
  }),

  components: {
    // LinearPreloaderComponent,
    InputComponent,
    Popper,
    NewTaskModalComponent,
    NewMaterialModalComponentVue,
    GradesView,
    MembersView,
    MessengerView,
    SettingsView,
    TasksView,
    ChatView,
  },

  mounted() {
    this.$route.query.search
      ? this.$router.push(
          `/courses/${this.$route.params.course}?q=${this.$route.query.q}`
        )
      : "";

    if (
      (this.$route.query.q == "Grade" && this.isTeacher === false) ||
      (this.$route.query.q == "Settings" && this.isTeacher === false)
    ) {
      this.$router.push(`/courses/${this.$route.params.course}?q=Task`);
    }

    if (
      this.loadStatusLoadedCourse != "READY" &&
      this.loadedCourse.id != this.$route.params.course
    ) {
      this.$store.dispatch("getCourse", this.$route.params.course);
      this.$store.dispatch("getTasks", {
        course: this.$route.params.course,
        type: "Date",
        search: this.search,
      });
    }
  },

  computed: {
    ...mapGetters([
      "loadedCourse",
      "authUser",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
      "loadStatusLoadedFiles",
      "tasks",
      "leaderPhotoPath",
      "dates",
      "isTeacher",
      "loadedFolders",
      "tasksSearch",
      "loadStatusCreateTask",
    ]),

    type() {
      return this.$route.meta.type + "-view";
    },
  },

  methods: {
    ...mapMutations(["setTasksSearch"]),

    toMessenger() {
      this.$store
        .dispatch("getMessengers", {
          course: this.$route.params.course,
        })
        .then(() => {
          this.$router.push({
            name: "course.messenger",
            params: {
              course: this.$route.params.course,
            },
          });
        });
    },

    toSettings() {
      this.$router.push({
        name: "course.settings",
        params: {
          course: this.$route.params.course,
        },
      });
    },

    toGrades() {
      this.$router.push({
        name: "course.grades",
        params: {
          course: this.$route.params.course,
        },
      });
    },

    newTasks() {
      let route = "";

      if (this.search !== "") {
        route = `/courses/${this.$route.params.course}?q=${this.$route.query.q}&search=${this.search}`;
      } else {
        route = `/courses/${this.$route.params.course}?q=${this.$route.query.q}`;
      }

      this.$router.push(route);

      this.setTasksSearch(this.search);

      this.$store.dispatch("getTasks", {
        course: this.$route.params.course,
        type: "Date",
        search: this.tasksSearch,
      });
    },

    toTask(task, folder = null) {
      if (!this.loadedTask || this.loadedTask.id != task) {
        this.$store
          .dispatch("getTask", {
            course: this.$route.params.course,
            task: task,
          })
          .then(() => {
            if (this.loadedTask.type && this.loadedTask.type.id == 1)
              this.$store.dispatch("getAuthDecision", {
                course: this.$route.params.course,
                task: task,
              });
          });
      }

      this.$store
        .dispatch("getMainFiles", {
          course: this.$route.params.course,
          task: task,
        })
        .then(() => {
          this.$router.push({
            name: "task",
            params: {
              course: this.loadedCourse.id,
              task: task,
            },
          });
        });

      if (folder != null) {
        this.$store
          .dispatch("getTaskFiles", {
            course: this.$route.params.course,
            task: task,
            folder: folder,
          })
          .then(() => {
            this.$router.push({
              name: "task",
              params: {
                course: this.loadedCourse.id,
                task: task,
              },
            });
          });
      }
    },
  },
};
</script>

<template>
  <div class="pt-4 text-light position-relative d-flex flex-column">
    <new-task-modal-component></new-task-modal-component>
    <new-material-modal-component-vue></new-material-modal-component-vue>
    <div class="flex-fill d-flex flex-column">
      <div class="main-px points-1 fs-4" style="max-width: 768px; height: 39px">
        <span v-if="loadStatusLoadedCourse === 'READY'">
          {{ loadedCourse.title }}
        </span>
      </div>
      <div class="mt-4 w-100 main-px border-bottom border-gray-2">
        <div class="d-flex align-items-center mb-2 text-gray-1">
          <div class="me-2 pe-2 py-1 text">
            <router-link
              :class="
                this.$route.name == 'course.tasks' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="{
                name: 'course.tasks',
                params: {
                  course: this.$route.params.course,
                },
              }"
            >
              Задания
            </router-link>
          </div>
          <div class="me-2 pe-2 py-1 text">
            <router-link
              :class="
                this.$route.name == 'course.members' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="{
                name: 'course.members',
                params: {
                  course: this.$route.params.course,
                },
              }"
            >
              Участники
            </router-link>
          </div>
          <div class="me-2 pe-2 py-1 text">
            <div
              :class="
                this.$route.name == 'course.messenger'
                  ? 'active'
                  : 'text-gray-1'
              "
              class="text text-decoration-none cursor-pointer"
              @click.prevent="toMessenger()"
            >
              Мессенджер
            </div>
          </div>
          <div class="btn-group d-block d-md-none" v-if="isTeacher">
            <div
              class="d-flex align-items-center justify-content-start"
              style="width: 24px; height: 24px"
            >
              <div
                class=""
                style="width: 24px; height: 24px"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </div>
              <ul
                class="dropdown-menu dropdown-menu-dark dropdown-menu-end border border-gray-2 background-dark-2 py-1 overflow-hidden fs-14"
                style="min-width: 200px"
              >
                <li class="text">
                  <div
                    @click.prevent="toGrades()"
                    :class="
                      this.$route.name == 'course.grades'
                        ? 'active'
                        : 'text-gray-1'
                    "
                    class="text text-decoration-none px-2 py-2 cursor-pointer"
                  >
                    Оценки
                  </div>
                </li>
                <li class="text">
                  <div
                    @click.prevent="toSettings()"
                    :class="
                      this.$route.name == 'course.settings'
                        ? 'active'
                        : 'text-gray-1'
                    "
                    class="text text-decoration-none px-2 py-2 cursor-pointer"
                  >
                    Настройки
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="d-none d-md-flex align-items-center" v-if="isTeacher">
            <div class="me-2 pe-2 py-1 text cursor-pointer">
              <div
                @click.prevent="toGrades()"
                :class="
                  this.$route.name == 'course.grades' ? 'active' : 'text-gray-1'
                "
                class="text text-decoration-none"
              >
                Оценки
              </div>
            </div>
            <div class="me-2 pe-2 py-1 text cursor-pointer">
              <div
                @click.prevent="toSettings()"
                :class="
                  this.$route.name == 'course.settings'
                    ? 'active'
                    : 'text-gray-1'
                "
                class="text text-decoration-none"
              >
                Настройки
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-fill">
        <transition name="slide-fade" mode="out-in">
          <component :is="type"> </component>
        </transition>
      </div>
    </div>
  </div>
</template>
