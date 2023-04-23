<script>
import { mapGetters, mapMutations } from "vuex";
import NewTaskModalComponent from "@/components/modal/NewTaskModalComponent.vue";
import NewMaterialModalComponentVue from "@/components/modal/NewMaterialModalComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import Popper from "vue3-popper";

export default {
  name: "CourseView",

  data: () => ({
    isLoaded: false,
    search: "",
  }),

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
  },

  methods: {
    ...mapMutations(["setTasksSearch"]),

    newTasks() {
      let route = "";

      if (this.search !== "") {
        route = `/courses/${this.$route.params.course}/tasks?search=${this.search}`;
      } else {
        route = `/courses/${this.$route.params.course}/tasks`;
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

  components: {
    InputComponent,
    Popper,
    NewTaskModalComponent,
    NewMaterialModalComponentVue,
  },
};
</script>

<template>
  <div class="pt-4 text-light position-relative">
    <new-task-modal-component></new-task-modal-component>
    <new-material-modal-component-vue></new-material-modal-component-vue>

    <div class="main-px">
      <div class="d-flex align-items-center justify-content-start">
        <div class="dropdown" v-if="isTeacher">
          <button
            class="btn btn-primary px-2 py-1 d-flex align-items-center"
            type="button"
            id="addTask"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            <span class="ms-1"> Создать </span>
          </button>
          <ul
            class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end border border-gray-2 background-dark-2 py-1 overflow-hidden fs-14"
            aria-labelledby="addTask"
          >
            <li>
              <button
                class="dropdown-item"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#newTask"
              >
                Новое задание
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#newMaterial"
              >
                Новый материал
              </button>
            </li>
          </ul>
        </div>
        <!-- <button
              v-if="isTeacher"
              class="btn btn-primary px-2 py-1 d-flex align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
              <span class="ms-1"> Создать </span>
            </button> -->

        <!-- <button
              class="bg-transparent border-0 me-3"
              :class="isTeacher ? 'ms-3' : ''"
            >
              <img src="@/assets/funnel.png" alt="" />
            </button> -->

        <form
          action=""
          style="max-width: 320px"
          class="w-100"
          :class="isTeacher ? 'ms-3' : ''"
        >
          <input-component
            v-on:input="newTasks"
            :modelValue="'Поиск...'"
            v-model="search"
          ></input-component>
        </form>
      </div>
      <div class="mw-900 mt-4">
        <div class="" v-if="dates">
          <div
            class="w-100 border rounded border-gray-2 overflow-hidden mb-3 pb-2"
            v-for="date in dates"
            :key="date"
          >
            <div class="text-light fs-5 py-2 px-3">
              {{ date }}
            </div>
            <div class="" v-for="task in tasks" :key="task.id">
              <div
                class="d-flex align-items-center justify-content-start"
                v-if="task.created_at === date"
              >
                <div
                  class="d-flex w-100 align-items-center justify-content-between my-hover justify-content-start text-light py-2 px-3"
                >
                  <div class="d-flex align-items-center">
                    <img
                      v-if="task.type.id == 1"
                      src="@/assets/file-earmark-fill.png"
                      alt=""
                      style="width: 22px; height: 22px; margin-right: 2px"
                    />
                    <img v-else src="@/assets/info-lg.png" alt="" />

                    <div
                      class="ms-2 points-1 cursor-pointer"
                      @click.prevent="
                        toTask(
                          task.id,
                          task.folders != '' ? task.folders[0].id : null
                        )
                      "
                    >
                      {{ task.title }}
                    </div>
                  </div>
                  <div class="" v-if="task.is_completed == false">
                    <Popper>
                      <div
                        class="rounded-circle bg-primary cursor-pointer"
                        style="width: 16px; height: 16px"
                      ></div>
                      <template #content>
                        <div class="bg-primary p-2 rounded text-light">
                          Задание не выполнено
                        </div>
                      </template>
                    </Popper>
                  </div>
                  <div
                    class="text-primary"
                    v-if="
                      authUser != '' && authUser.id == loadedCourse.leader.id
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-gear-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
                      />
                    </svg>
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
          :class="tasks != '' ? 'border border-gray-2 rounded' : ''"
          v-if="dates == null"
        >
          <div v-for="task in tasks" :key="task.id">
            <div
              class="d-flex w-100 align-items-center justify-content-between my-hover justify-content-start text-light py-2 px-3"
            >
              <div class="d-flex align-items-center">
                <img
                  v-if="task.type.id == 1"
                  src="@/assets/file-earmark-fill.png"
                  alt=""
                  style="width: 22px; height: 22px; margin-right: 2px"
                />
                <img v-else src="@/assets/info-lg.png" alt="" />

                <div
                  class="ms-2 points-1 cursor-pointer"
                  @click.prevent="
                    toTask(
                      task.id,
                      task.folders != '' ? task.folders[0].id : null
                    )
                  "
                >
                  {{ task.title }}
                </div>
              </div>
              <div class="" v-if="task.is_completed == false">
                <Popper>
                  <div
                    class="rounded-circle bg-primary cursor-pointer"
                    style="width: 16px; height: 16px"
                  ></div>
                  <template #content>
                    <div class="bg-primary p-2 rounded text-light">
                      Задание не выполнено
                    </div>
                  </template>
                </Popper>
              </div>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
        <div
          class=""
          v-if="
            (loadStatusLoadedTasks === 'EMPTY' &&
              loadStatusLoadedCourse === 'READY') ||
            tasks == ''
          "
        >
          <div class="w-100 text-center fs-1 text-gray-1">
            <div class="py-3 w-100 border rounded border-gray-2">
              Нет заданий
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
