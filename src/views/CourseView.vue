<script>
import { mapGetters } from "vuex";
import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "CourseView",

  data: () => ({
    isLoaded: false,
  }),

  mounted() {
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
      this.$store.dispatch("getTasks", this.$route.params.course);
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
      "dates",
      "isTeacher",
      "loadedFolders",
    ]),
  },

  methods: {
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

  components: {
    LinearPreloaderComponent,
    InputComponent,
  },
};
</script>

<template>
  <div class="pt-4 text-light position-relative">
    <linear-preloader-component
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
    ></linear-preloader-component>

    <div class="">
      <div class="main-px points-1 fs-4" style="max-width: 768px; height: 39px">
        <span v-if="loadStatusLoadedCourse === 'READY'">
          {{ loadedCourse.title }}
        </span>
      </div>
      <div class="mt-4 w-100 main-px border-bottom border-gray-1">
        <div class="d-flex align-items-center mb-2 text-gray-1">
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="this.$route.query.q == 'Task' ? 'active' : 'text-gray-1'"
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Task'"
            >
              Задания
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="
                this.$route.query.q == 'Members' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Members'"
            >
              Участники
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="
                this.$route.query.q == 'Messenger' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Messenger'"
            >
              Мессенджер
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text" v-if="isTeacher">
            <router-link
              :class="this.$route.query.q == 'Grade' ? 'active' : 'text-gray-1'"
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Grade'"
            >
              Оценки
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text" v-if="isTeacher">
            <router-link
              :class="
                this.$route.query.q == 'Settings' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Settings'"
            >
              Настройки
            </router-link>
          </div>
        </div>
      </div>
      <div class="main-px mt-4">
        <div class="" v-if="this.$route.query.q == 'Task'">
          <div class="d-flex align-items-center justify-content-start">
            <button v-if="isTeacher" class="btn btn-primary px-2 py-1">
              Создать
            </button>

            <button
              class="bg-transparent border-0 me-3"
              :class="isTeacher ? 'ms-3' : ''"
            >
              <img src="@/assets/funnel.png" alt="" />
            </button>

            <form action="">
              <input-component :modelValue="'Поиск...'"></input-component>
            </form>
          </div>
          <div class="mw-768 mt-4">
            <div
              class=""
              v-if="
                loadStatusLoadedTasks === 'READY' &&
                loadStatusLoadedCourse === 'READY'
              "
            >
              <div
                class="w-100 border rounded border-gray-1 overflow-hidden"
                v-for="date in dates"
                :key="date"
              >
                <div class="text-light fs-18 py-2 px-3">
                  {{ date }}
                </div>
                <div class="" v-for="(task, index) in tasks" :key="task.id">
                  <div
                    class="d-flex align-items-center justify-content-start"
                    v-if="task.created_at === date"
                  >
                    <div
                      :class="tasks.length - 1 != index ? 'border-bottom' : ''"
                      class="d-flex w-100 align-items-center my-hover justify-content-start text-decoration-none text-light cursor-pointer py-2 px-3 border-gray-1"
                      @click.prevent="
                        toTask(
                          task.id,
                          task.folders != '' ? task.folders[0].id : null
                        )
                      "
                    >
                      <img
                        v-if="task.type.id == 1"
                        src="@/assets/file-earmark-fill.png"
                        alt=""
                      />
                      <img v-else src="@/assets/info-lg.png" alt="" />

                      <div class="ms-2 points-1 flex-fill">
                        {{ task.title }}
                      </div>
                      <div class="text-gray-1 fs-14">
                        {{ task.created_at }}
                      </div>
                      <!-- </router-link> -->
                    </div>
                  </div>
                </div>
                <!-- <div
                class=""
                v-for="(task, index) in loadedCourse.tasks"
                :key="task.id"
              >
                {{
                  (index != 0 &&
                    this.$moment.getDate(task.created_at) !==
                      this.$moment.getDate(
                        loadedCourse.tasks[index - 1].created_at
                      )) ||
                  index == 0
                    ? this.$moment.getDate(task.created_at)
                    : ""
                }}
              </div> -->
              </div>
            </div>
            <div
              class=""
              v-if="
                loadStatusLoadedTasks === 'EMPTY' &&
                loadStatusLoadedCourse === 'READY'
              "
            >
              <div class="w-100 text-center fs-1 text-gray-1 pt-3">
                <div class="py-3 w-100 border rounded border-gray-1">
                  Нет заданий
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
