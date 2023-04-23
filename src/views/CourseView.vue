<script>
import { mapGetters, mapMutations } from "vuex";
import NewTaskModalComponent from "@/components/modal/NewTaskModalComponent.vue";
import NewMaterialModalComponentVue from "@/components/modal/NewMaterialModalComponent.vue";
// import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import Popper from "vue3-popper";

import GradesView from "./Course/GradesView.vue";
import MembersView from "./Course/MembersView.vue";
import MessengerView from "./Course/MessengerView.vue";
import SettingsView from "./Course/SettingsView.vue";
import TasksView from "./Course/TasksView.vue";

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
      this.$store
        .dispatch("getTask", {
          course: this.$route.params.course,
          task: task,
        })
        .then(() => {
          if (folder == null) {
            if (this.loadStatusLoadedTask == "READY") {
              this.$router.push({
                name: "task",
                params: {
                  course: this.loadedCourse.id,
                  task: task,
                },
              });
            }
          }
        });

      if (folder != null) {
        this.$store
          .dispatch("getFiles", {
            course: this.$route.params.course,
            task: task,
            folder: folder,
          })
          .then(() => {
            if (this.loadStatusLoadedFiles == "READY") {
              // this.$router.push({
              //   name: "folder",
              //   params: {
              //     course: this.loadedCourse.id,
              //     task: task,
              //     folder: folder,
              //   },
              // });
              if (this.loadStatusLoadedTask == "READY") {
                this.$router.push({
                  name: "task",
                  params: {
                    course: this.loadedCourse.id,
                    task: task,
                  },
                });
              }
            }
          });
      }
    },
  },
};
</script>

<template>
  <div class="pt-4 text-light position-relative">
    <new-task-modal-component></new-task-modal-component>
    <new-material-modal-component-vue></new-material-modal-component-vue>

    <!-- <linear-preloader-component
      :load="loadStatusLoadedCourse"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedTasks"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedTask"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedFiles"
    ></linear-preloader-component> -->

    <div class="">
      <div class="main-px points-1 fs-4" style="max-width: 768px; height: 39px">
        <span v-if="loadStatusLoadedCourse === 'READY'">
          {{ loadedCourse.title }}
        </span>
      </div>
      <div class="mt-4 w-100 main-px border-bottom border-gray-2">
        <div class="d-flex align-items-center mb-2 text-gray-1">
          <div class="me-2 px-2 py-1 text">
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
          <div class="me-2 px-2 py-1 text">
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
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="
                this.$route.name == 'course.messenger'
                  ? 'active'
                  : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="{
                name: 'course.messenger',
                params: {
                  course: this.$route.params.course,
                },
              }"
            >
              Мессенджер
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text" v-if="isTeacher">
            <router-link
              :class="
                this.$route.name == 'course.grades' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="{
                name: 'course.grades',
                params: {
                  course: this.$route.params.course,
                },
              }"
            >
              Оценки
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text" v-if="isTeacher">
            <router-link
              :class="
                this.$route.name == 'course.settings' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="{
                name: 'course.settings',
                params: {
                  course: this.$route.params.course,
                },
              }"
            >
              Настройки
            </router-link>
          </div>
        </div>
      </div>
      <div class="">
        <transition name="slide-fade" mode="out-in">
          <component :is="type"> </component>
        </transition>
      </div>
    </div>
  </div>
</template>
