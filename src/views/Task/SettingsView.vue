<script>
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
import NewFolderModalComponent from "@/components/modal/NewFolderModalComponent.vue";
import NewFileModalComponent from "@/components/modal/NewFileModalComponent.vue";

export default {
  name: "TaskSettingsView",

  data: () => ({
    v$: useVuelidate(),

    task: {
      title: "",
      description: "",
    },
    checked: "",
  }),

  mounted() {
    if (!this.isTeacher) {
      this.$router.push({
        name: "error",
      });
    }

    this.task.title = this.loadedTask.title;
    this.task.description = this.loadedTask.description;
    this.checked = this.loadedTask.is_published == 1 ? true : false;
  },

  validations() {
    return {
      task: {
        title: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 36 символа",
            maxLength(36)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 4 символов",
            minLength(4)
          ),
        },
      },
    };
  },

  computed: {
    ...mapGetters([
      "isTeacher",
      "loadedTask",
      "authUser",
      "mainFolder",
      "loadedCourse",
      "loadedFiles",
      "loadedFolders",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
      "loadStatusLoadedFiles",
      "loadStatusLoadedFile",
      "loadStatusLoadedMainFiles",
      "loadStatusLoadedDecision",
      "belonging",
      "typeFolders",
      "decision",
      "decisionFiles",
      "decisionFolders",
    ]),
  },

  methods: {
    resize() {
      let element = this.$refs["textarea"];
      const height = element.style.height;
      const scrollHeight = element.scrollHeight;

      if (scrollHeight > height)
        element.style.height = element.scrollHeight + "px";
    },

    updateTask() {
      this.$store.dispatch("updateTask", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        title: this.task.title,
        description: this.task.description,
      });
    },

    destroyTask() {
      this.$store.dispatch("destroyTask", {
        course: this.$route.params.course,
        task: this.$route.params.task,
      });
    },

    getTaskFiles(folder = null) {
      if (folder !== null) {
        this.$store.dispatch("getTaskFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          folder: folder,
        });
      } else {
        this.$store.dispatch("getMainFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
        });
      }
    },

    destroyTaskFile(file) {
      this.$store.dispatch("destroyTaskFile", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        file: file,
      });
    },

    destroyTaskFolder(folder) {
      this.$store.dispatch("destroyTaskFolder", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        folder: folder,
      });
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
            this.$router.push({
              name: "course.tasks",
              params: {
                course: course,
              },
            });
          }
        });
    },

    toFile(course, task, file, decision = null) {
      if (decision == null) {
        this.$store
          .dispatch("getTaskFile", {
            course: course,
            task: task,
            file: file,
          })
          .then(() => {
            if (this.loadStatusLoadedFile == "READY") {
              this.$router.push({
                name: "file",
                params: {
                  course,
                  task,
                  file,
                },
              });
            }
          });
      } else {
        this.$store
          .dispatch("getDecisionFile", {
            course: course,
            task: task,
            decision: decision,
            file: file,
          })
          .then(() => {
            if (this.loadStatusLoadedFile == "READY") {
              this.$router.push({
                name: "fileDecision",
                params: {
                  course,
                  task,
                  decision,
                  file,
                },
              });
            }
          });
      }
    },

    published() {
      this.$store.dispatch("published", {
        course: this.$route.params.course,
        task: this.$route.params.task,
      });
    },
  },

  components: {
    NewFolderModalComponent,
    NewFileModalComponent,
  },
};
</script>

<template>
  <new-file-modal-component></new-file-modal-component>
  <new-folder-modal-component></new-folder-modal-component>
  <div class="pt-4 main-px mw-900 text-light position-relative">
    <div class="">
      <div class="w-100">
        <div
          class="border border-gray-2 rounded d-flex flex-column align-items-start overflow-hidden mb-4"
        >
          <div
            class="border-gray-2 fs-5 w-100 background-dark-2 d-flex align-items-center"
          >
            <div class="ps-3 flex-fill py-2">Файлы</div>
            <div
              class="d-flex align-items-center text-primary"
              v-if="authUser != '' && authUser.id == loadedCourse.leader.id"
            >
              <div
                class="cursor-pointer px-3 py-2 primary-hover"
                data-bs-toggle="modal"
                :data-bs-target="'#newFolder'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-folder-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z"
                  />
                  <path
                    d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z"
                  />
                </svg>
              </div>
              <div
                class="cursor-pointer px-3 py-2 primary-hover"
                data-bs-toggle="modal"
                :data-bs-target="'#uploadFile'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-file-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"
                  />
                  <path
                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="w-100"
            v-if="loadedFolders != '' || loadedFiles != '' || belonging != ''"
          >
            <div class="w-100" v-if="belonging != ''">
              <template v-if="belonging != null && belonging != undefined">
                <div
                  @click.prevent="
                    getTaskFiles(
                      mainFolder.id == belonging.id ? null : belonging.id
                    )
                  "
                  class="text-light text-decoration-none my-hover flex-fill align-items-center w-100 d-flex py-2 px-3 cursor-pointer"
                  :class="
                    loadedFolders.length != 0 || loadedFiles.length != 0
                      ? 'border-bottom border-gray-2'
                      : ''
                  "
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                      />
                    </svg>
                  </div>
                </div>
              </template>
            </div>

            <!-- Folders -->
            <div
              v-for="(folder, index) in loadedFolders"
              :key="folder.id"
              class="w-100"
            >
              <div
                v-if="loadedFolders != '' && folder.original_name != 'files'"
                class="text-light text-decoration-none flex-fill d-flex align-items-center justify-content-start cursor-pointer"
                :class="
                  loadedFolders.length - 1 != index || loadedFiles.length != 0
                    ? 'border-bottom border-gray-2'
                    : ''
                "
              >
                <div
                  class="flex-fill py-2 ps-3 d-flex align-items-center my-hover"
                  @click.prevent="getTaskFiles(folder.id)"
                >
                  <div class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-folder-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"
                      />
                    </svg>
                  </div>

                  <div class="ms-3">
                    {{ folder.original_name }}
                  </div>
                </div>
                <div
                  v-if="isTeacher"
                  class="text-danger py-2 px-3 danger-hover"
                  @click.prevent="destroyTaskFolder(folder.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-trash2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Files -->
            <div
              v-for="(file, index) in loadedFiles"
              :key="file.id"
              class="w-100"
            >
              <div
                v-if="loadedFiles != ''"
                :class="
                  loadedFiles.length - 1 != index
                    ? 'border-bottom border-gray-2 '
                    : ''
                "
                class="d-flex align-items-center justify-content-start cursor-pointer"
              >
                <div
                  class="flex-fill d-flex align-items-center py-2 ps-3 my-hover"
                  @click.prevent="
                    toFile(loadedCourse.id, loadedTask.id, file.id)
                  "
                >
                  <div class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-file-earmark"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                      />
                    </svg>
                  </div>
                  <div class="ms-3 flex-fill">
                    {{ file.original_name }}
                  </div>
                </div>
                <div
                  v-if="isTeacher"
                  class="text-danger py-2 px-3 danger-hover"
                  @click.prevent="destroyTaskFile(file.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-trash2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="p-3 w-100 text-center fs-18" v-else>Файлы отсутствуют</div> -->
        </div>

        <div class="" v-if="typeFolders != 'Task'">
          <form action="" class="" @submit.prevent="updateTask">
            <div class="d-flex align-items-center pb-3">
              <div class="fs-5 flex-fill points-1">
                Информация о
                {{
                  this.loadedTask && this.loadedTask.type.id == 1
                    ? "задании"
                    : "материале"
                }}
              </div>
              <button type="submit" class="btn btn-primary px-2 py-1 ms-3">
                Изменить
              </button>
            </div>
            <label for="title" class="form-label fw-normal">Название</label>
            <input
              class="form-control border-gray-2 bg-transparent text-light"
              style="height: 32px"
              type="text"
              name="title"
              v-model="task.title"
            />
            <div class="" style="min-height: 21px" v-if="v$.task.title.$error">
              <div class="form-error">
                <div
                  class="form-error__message text-danger fw-normal"
                  style="font-size: 14px"
                >
                  {{ v$.task.title.$errors[0].$message }}
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center mb-2 mt-3">
              <div class="text-light">Описание</div>
            </div>
            <textarea
              class="p-2 pb-3 text-light w-100 background-dark-1 rounded form-control border-gray-2"
              type="text"
              name="name"
              ref="textarea"
              @input="resize()"
              @focus="resize()"
              style="min-height: 217px"
              v-model="task.description"
            ></textarea>
          </form>

          <div class="mt-4">
            <div class="pb-2 fs-5">Изменения</div>
            <div class="border rounded px-3 py-2 border-gray-2">
              <div class="form-check d-flex align-items-start">
                <input
                  class="form-check-input background-dark-3 border-gray-2 flex-shrink-0"
                  type="checkbox"
                  id="published"
                  v-model="checked"
                  @click="published()"
                />
                <div class="ms-2">
                  <label class="form-check-label" for="published"
                    >Публикация</label
                  >
                  <div class="text-gray-1 fs-14">
                    Позволяет видеть данное задание всем участникам курса.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="fs-5 mt-4 pb-2">Опасная зона</div>
          <div class="py-2 px-3 border rounded border-danger">
            <div class="d-flex align-items-center">
              <div class="flex-fill">
                <div class="">
                  Удаление
                  {{
                    this.loadedTask && this.loadedTask.type.id == 1
                      ? "задания"
                      : "материала"
                  }}
                </div>
                <div class="fs-14 text-gray-1">
                  При удалении
                  {{
                    this.loadedTask && this.loadedTask.type.id == 1
                      ? "задания"
                      : "материала"
                  }}
                  вся информация, связанная с ним будет удалена НАВСЕГДА.
                </div>
              </div>
              <button
                class="btn btn-danger py-1 px-2 flex-shrink-0 ms-3"
                @click.prevent="destroyTask"
              >
                Удалить
                {{
                  this.loadedTask && this.loadedTask.type.id == 1
                    ? "задание"
                    : "материал"
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
