<script>
import { mapGetters, mapMutations } from "vuex";
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
      "createdTask",
      "authUser",
      "loadedTask",
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
      "loadStatusLoadedDecision",
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

    toSettings(task) {
      this.$store.dispatch("getTask", {
        course: this.$route.params.course,
        task: task,
      });

      this.$store.dispatch("getMainFiles", {
        course: this.$route.params.course,
        task: task,
      });

      this.$store
        .dispatch("getAuthDecision", {
          course: this.$route.params.course,
          task: task,
        })
        .then(() => {
          this.$router.push({
            name: "task.settings",
            params: {
              course: this.$route.params.course,
              task: task,
            },
          });
        });
    },

    toTask(task, type, folder = null) {
      if (!this.loadedTask || this.loadedTask.id != task) {
        this.$store.dispatch("getTask", {
          course: this.$route.params.course,
          task: task,
        });
      }

      if (type == 1) {
        this.$store.dispatch("getAuthDecision", {
          course: this.$route.params.course,
          task: task,
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

    storeTask(type) {
      this.$store
        .dispatch("storeTask", {
          course: this.$route.params.course,
          type: type,
        })
        .then(() => {
          this.$store.dispatch("getAuthDecision", {
            course: this.$route.params.course,
            task: this.createdTask.id,
          });

          this.$store.dispatch("getMainFiles", {
            course: this.$route.params.course,
            task: this.createdTask.id,
          });

          this.$store.dispatch("getTasks", {
            course: this.$route.params.course,
            type: "Date",
            search: "",
          });

          this.$store.dispatch("getMembers", this.$route.params.course);

          this.$store
            .dispatch("getTask", {
              course: this.$route.params.course,
              task: this.createdTask.id,
            })
            .then(() => {
              this.$router.push({
                name: "task.settings",
                params: {
                  course: this.loadedCourse.id,
                  task: this.createdTask.id,
                },
              });
            });
        });
    },
  },

  components: {
    Popper,
  },
};
</script>

<template>
  <div class="pt-4 text-light position-relative">
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
                @click.prevent="storeTask(1)"
              >
                Новое задание
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                @click.prevent="storeTask(2)"
              >
                Новый материал
              </button>
            </li>
          </ul>
        </div>
        <div
          action=""
          style="max-width: 320px"
          class="w-100 d-flex align-items-center"
          :class="isTeacher ? 'ms-3' : ''"
        >
          <input
            class="form-control bg-transparent border-gray-2 text-light px-2 py-1"
            type="text"
            name="search"
            v-model="search"
            placeholder="Поиск..."
          />
          <button
            @click.prevent="newTasks()"
            style="height: 34px"
            class="ms-2 text-light d-flex align-items-center justify-content-center px-2 py-1 btn btn-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
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
                class="d-flex align-items-center justify-content-start my-hover"
                v-if="task.created_at === date"
              >
                <div
                  class="d-flex w-100 align-items-center justify-content-between justify-content-start text-light cursor-pointer"
                >
                  <div
                    @click.prevent="
                      toTask(
                        task.id,
                        task.type ? task.type.id : '',
                        task.folders != '' ? task.folders[0].id : null
                      )
                    "
                    class="d-flex align-items-center py-2 ps-3 flex-fill"
                    :class="
                      authUser != '' && authUser.id == loadedCourse.leader.id
                        ? task.is_published == 1
                          ? 'my-hover'
                          : 'my-hover-tr'
                        : ''
                    "
                  >
                    <div
                      :class="
                        task.is_published == 1 ? 'text-white' : 'text-gray-1'
                      "
                      v-if="task.type.id == 1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        class="bi bi-clipboard-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"
                        />
                      </svg>
                    </div>
                    <div
                      :class="
                        task.is_published == 1 ? 'text-white' : 'text-gray-1'
                      "
                      v-else
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        class="bi bi-info-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                        />
                      </svg>
                    </div>

                    <div
                      class="ms-2 points-1 cursor-pointer"
                      :class="
                        task.is_published == 1 ? 'text-white' : 'text-gray-1'
                      "
                    >
                      {{ task.title }}
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-center px-3"
                    v-if="task.is_completed == 1"
                  >
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
                    class="d-flex align-items-center px-3"
                    v-if="task.is_completed == 4"
                  >
                    <Popper>
                      <div
                        class="rounded-circle bg-warning cursor-pointer"
                        style="width: 16px; height: 16px"
                      ></div>
                      <template #content>
                        <div class="bg-primary p-2 rounded text-light">
                          Возвращено для переработки
                        </div>
                      </template>
                    </Popper>
                  </div>
                  <div
                    @click.prevent="toSettings(task.id)"
                    class="cursor-pointer d-flex align-items-center justify-content-center px-3"
                    :class="
                      task.is_published == 1
                        ? 'text-primary primary-hover'
                        : 'text-primary-tr primary-tr-hover'
                    "
                    style="height: 40px"
                    v-if="
                      authUser != '' && authUser.id == loadedCourse.leader.id
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-gear-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          :class="tasks != '' ? 'border border-gray-2 rounded' : ''"
          v-if="dates == null"
        >
          <div v-for="task in tasks" :key="task.id">
            <div
              class="d-flex w-100 align-items-center justify-content-between my-hover justify-content-start text-light"
            >
              <div
                class="d-flex align-items-center flex-fill ps-3 py-2"
                @click.prevent="
                  toTask(
                    task.id,
                    task.type ? task.type.id : '',
                    task.folders != '' ? task.folders[0].id : null
                  )
                "
              >
                <img
                  v-if="task.type.id == 1"
                  src="@/assets/file-earmark-fill.png"
                  alt=""
                  style="width: 22px; height: 22px; margin-right: 2px"
                />
                <img v-else src="@/assets/info-lg.png" alt="" />

                <div class="ms-2 points-1 cursor-pointer flex-fill">
                  {{ task.title }}
                </div>
              </div>
              <div
                class="d-flex align-items-center px-3 py-2"
                v-if="task.is_completed == 1"
              >
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
                class="d-flex align-items-center px-3 py-2"
                v-if="task.is_completed == 4"
              >
                <Popper>
                  <div
                    class="rounded-circle bg-warning cursor-pointer"
                    style="width: 16px; height: 16px"
                  ></div>
                  <template #content>
                    <div class="bg-primary p-2 rounded text-light">
                      Возвращено для переработки
                    </div>
                  </template>
                </Popper>
              </div>
              <div
                @click.prevent="toSettings(task.id)"
                class="cursor-pointer d-flex align-items-center justify-content-center px-3"
                :class="
                  task.is_published == 1
                    ? 'text-primary primary-hover'
                    : 'text-primary-tr primary-tr-hover'
                "
                style="height: 40px"
                v-if="authUser != '' && authUser.id == loadedCourse.leader.id"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-gear-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
                  />
                </svg>
              </div>
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
