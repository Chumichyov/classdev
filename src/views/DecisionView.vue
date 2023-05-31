<script>
import { mapGetters } from "vuex";
export default {
  name: "DecisionView",

  mounted() {
    if (this.loadStatusLoadedDecision == null) {
      this.$store.dispatch("showDecision", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        decision: this.$route.params.decision,
      });
    }

    if (this.loadedCourse == "") {
      this.$store.dispatch("getCourse", this.$route.params.course);
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
      "belonging",
    ]),
  },

  methods: {
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

    updateDecision(status) {
      this.$store.dispatch("updateDecision", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        decision: this.$route.params.decision,
        description: this.decision.description,
        grade: null,
        completed: status,
      });
    },

    changeGrade() {
      this.$store.dispatch("updateDecision", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        decision: this.$route.params.decision,
        description: this.decision.description,
        grade: this.decision.grade,
        completed: this.decision.completed.id,
      });
    },

    getDecisionFiles(folder = null) {
      if (folder !== null) {
        this.$store.dispatch("getDecisionFiles", {
          course: this.$route.params.course,
          task: this.$route.params.task,
          decision: this.decision.id,
          folder: folder,
        });
      } else {
        this.$store.dispatch("getAuthDecision", {
          course: this.$route.params.course,
          task: this.$route.params.task,
        });
      }
    },

    toFile(course, task, file, decision = null) {
      if (decision == null) {
        this.$store.dispatch("getReviews", {
          course: course,
          task: task,
          decision: undefined,
          file: file,
        });
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
        this.$store.dispatch("getReviews", {
          course: course,
          task: task,
          decision: decision,
          file: file,
        });
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
  },
};
</script>

<template>
  <div class="pt-4">
    <div class="w-100">
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
            class="breadcrumb-item text-decoration-none cursor-pointer text-primary"
            aria-current="page"
            @click.prevent="toTask()"
          >
            {{ loadedTask.type.title }}
          </li>
          <li
            class="breadcrumb-item text-gray-1"
            aria-current="page"
            v-if="decision && decision.user"
          >
            {{ decision.user.name }} {{ decision.user.surname }}
          </li>
          <!-- <li
            class="breadcrumb-item text-gray-1"
            aria-current="page"
            v-if="
              loadStatusLoadedFile == 'READY' &&
              (this.$route.name == 'file' || this.$route.name == 'fileDecision')
            "
          >
            {{ loadedFile.file.original_name }}
          </li> -->
        </ol>
      </nav>

      <div class="main-px fs-4 pb-4 border-bottom border-gray-2">
        <div
          class="points-1 d-flex align-items-center"
          v-if="loadStatusLoadedTask === 'READY'"
          style="max-width: 768px; height: 39px"
        >
          <div class="points-1 text-white">
            {{ loadedTask.title }}
          </div>
        </div>
      </div>
    </div>

    <div class="main-px mw-900">
      <div class="mt-4 fs-5 text-light d-flex align-items-center">
        <img
          v-if="decision.user && decision.user.information"
          :src="this.$url + decision.user.information.photo_path"
          alt=""
          class="rounded-circle"
          style="width: 24px; height: 24px"
        />
        <div class="ms-2" v-if="decision.user">
          {{ decision.user.name }} {{ decision.user.surname }}
        </div>
      </div>
      <div class="border border-gray-2 rounded overflow-hidden mt-3">
        <div class="background-dark-2 d-flex justify-content-between">
          <div class="ps-3 fs-5 py-2 flex-fill text-primary">Файлы</div>
        </div>
        <div
          class="w-100"
          v-if="decisionFolders != '' || decisionFiles != '' || belonging != ''"
        >
          <div class="w-100" v-if="belonging != ''">
            <template v-if="belonging == null && belonging != undefined">
              <div
                @click.prevent="getDecisionFiles(belonging.id)"
                class="text-light text-decoration-none my-hover flex-fill align-items-center w-100 d-flex py-2 px-3 cursor-pointer"
                :class="
                  decisionFolders.length != 0 || decisionFiles.length != 0
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

            <template v-if="belonging && belonging != null">
              <div
                @click.prevent="getDecisionFiles(belonging.id)"
                class="text-light text-decoration-none my-hover flex-fill align-items-center w-100 d-flex py-2 px-3 cursor-pointer"
                :class="
                  decisionFolders.length != 0 || decisionFiles.length != 0
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
        </div>

        <!-- Folders -->
        <div
          v-for="(folder, index) in decisionFolders"
          :key="folder.id"
          class="w-100"
        >
          <div
            v-if="
              decisionFolders != '' &&
              folder.original_name != 'user_' + this.authUser.id
            "
            class="text-light text-decoration-none flex-fill d-flex align-items-center justify-content-start cursor-pointer my-hover"
            :class="
              (decisionFolders.length - 1 != index ||
                decisionFiles.length != 0) &&
              decisionFolders.length != 0
                ? 'border-bottom border-gray-2'
                : ''
            "
          >
            <div
              class="flex-fill py-2 ps-3 d-flex align-items-center"
              @click.prevent="getDecisionFiles(folder.id)"
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
              class="px-3 text-primary fw-bold"
              v-if="
                decision.completed_id != 1 &&
                decision.completed_id != 2 &&
                folder.reviews != 0
              "
            >
              {{ folder.reviews }}
            </div>
          </div>
        </div>
        <!-- Files -->
        <div
          v-for="(file, index) in decisionFiles"
          :key="file.id"
          class="w-100"
        >
          <div
            v-if="decisionFiles != ''"
            class="d-flex align-items-center justify-content-start cursor-pointer my-hover"
            :class="
              decisionFiles.length - 1 != index
                ? 'border-bottom border-gray-2 '
                : ''
            "
          >
            <div
              @click.prevent="
                toFile(loadedCourse.id, loadedTask.id, file.id, decision.id)
              "
              class="flex-fill d-flex align-items-center py-2 ps-3 text-white"
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
              class="px-3 text-primary fw-bold"
              v-if="
                decision.completed_id != 1 &&
                decision.completed_id != 2 &&
                file.reviews != 0
              "
            >
              {{ file.reviews }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="px-2 mt-4 text-white">
          {{ decision.description }}
        </div>
        <div
          :class="
            decision.description != '' ||
            decisionFolders != '' ||
            decisionFiles != '' ||
            belonging != ''
              ? 'mt-4'
              : ''
          "
          class="mt-4 border border-primary rounded px-3 py-2 text-white"
        >
          <div class="d-flex align-items-center py-1">
            <div class="w-100" style="max-width: 130px">Статус:</div>
            <div
              class="ms-3"
              v-if="decision.completed"
              :class="
                decision.completed && decision.completed.id == 3
                  ? 'text-success'
                  : decision.completed && decision.completed.id == 4
                  ? 'text-warning'
                  : decision.completed && decision.completed.id == 5
                  ? 'text-danger'
                  : 'text-primary'
              "
            >
              {{ decision.completed.title }}
            </div>
          </div>
          <div class="d-flex align-items-center py-1">
            <div class="w-100" style="max-width: 130px">Оценка:</div>
            <div
              class="ms-3 d-flex align-items-center"
              v-if="decision.completed && decision.completed.id == 3"
            >
              <input
                type="text"
                name="grade"
                v-model="decision.grade"
                class="form-control py-1 bg-transparent border-gray-2 text-light"
                placeholder="Назначьте оценку"
              />
              <button
                class="ms-2 bg-transparent border-0 text-primary"
                @click.prevent="changeGrade()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-send-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
                  />
                </svg>
              </button>
            </div>
            <div class="ms-3" v-else>
              {{ decision.grade == null ? "Отсутствует" : decision.grade }}
            </div>
          </div>
          <div class="d-flex align-items-center py-1">
            <div class="w-100" style="max-width: 130px">Изменение:</div>
            <div class="ms-3">
              {{ this.$moment.getDateTime(decision.updated_at) }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 text-end">
        <button
          class="btn btn-outline-danger px-2 py-1"
          v-if="decision.completed && decision.completed.id != 5"
          @click.prevent="updateDecision(5)"
        >
          Отклонить
        </button>
        <button
          class="btn btn-outline-warning px-2 py-1 ms-2"
          v-if="decision.completed && decision.completed.id != 4"
          @click.prevent="updateDecision(4)"
        >
          Переделать
        </button>
        <button
          class="btn btn-outline-success px-2 py-1 ms-2"
          v-if="decision.completed && decision.completed.id != 3"
          @click.prevent="updateDecision(3)"
        >
          Принять
        </button>
      </div>
    </div>
  </div>
</template>
