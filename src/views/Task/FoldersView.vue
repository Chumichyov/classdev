<script>
import { mapGetters } from "vuex";
import NewFolderModalComponent from "@/components/modal/NewFolderModalComponent.vue";
import NewFileModalComponent from "@/components/modal/NewFileModalComponent.vue";
import Popper from "vue3-popper";

export default {
  name: "FoldersView",

  data: () => ({
    description: "",
  }),

  mounted() {
    this.description = this.decision.description;
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
      "decisions",
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

    destroyDecisionFile(file) {
      this.$store.dispatch("destroyDecisionFile", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        decision: this.decision.id,
        file: file,
      });
    },

    destroyDecisionFolder(folder) {
      this.$store.dispatch("destroyDecisionFolder", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        decision: this.decision.id,
        folder: folder,
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
        this.$store.dispatch("getTask", {
          course: this.$route.params.course,
          task: this.$route.params.task,
        });
      }
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

    updateDecision(completed = null) {
      this.$store.dispatch("updateDecision", {
        course: this.$route.params.course,
        task: this.$route.params.task,
        decision: this.decision.id,
        description: this.description,
        completed: completed,
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

  components: {
    NewFolderModalComponent,
    NewFileModalComponent,
    Popper,
  },
};
</script>

<template>
  <new-file-modal-component
    :type="'Decision'"
    v-if="!isTeacher && loadedTask.type.id == 1"
  ></new-file-modal-component>
  <new-folder-modal-component
    :type="'Decision'"
    v-if="!isTeacher && loadedTask.type.id == 1"
  ></new-folder-modal-component>
  <div class="main-px mw-900 my-4">
    <div
      class="border border-gray-2 rounded d-flex flex-column align-items-start overflow-hidden"
      v-if="
        (loadedFolders != '' ||
          loadedFiles != '' ||
          (belonging != '' && belonging != null)) &&
        typeFolders != 'Decision'
      "
    >
      <div
        class="border-gray-2 fs-5 w-100 background-dark-2 d-flex align-items-center"
      >
        <div class="ps-3 flex-fill py-2 text-primary" v-if="loadedTask">
          {{ loadedTask.type.title }}
        </div>
      </div>
      <div
        class="w-100"
        v-if="loadedFolders != '' || loadedFiles != '' || belonging != ''"
      >
        <div class="w-100" v-if="belonging != ''">
          <template v-if="belonging == null && belonging != undefined">
            <div
              @click.prevent="getTaskFiles()"
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

          <template v-if="belonging && belonging != undefined">
            <div
              @click.prevent="getTaskFiles(belonging.id)"
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
          </div>
        </div>

        <!-- Files -->
        <div v-for="(file, index) in loadedFiles" :key="file.id" class="w-100">
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
              @click.prevent="toFile(loadedCourse.id, loadedTask.id, file.id)"
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
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        typeFolders == '' &&
        loadedTask.description != '' &&
        loadedTask.description != null
      "
      :class="
        loadedFolders != '' ||
        loadedFiles != '' ||
        (belonging != '' && belonging != null)
          ? 'mt-4'
          : ''
      "
      class="rounded overflow-hidden"
    >
      <div class="px-2">
        {{ loadedTask.description }}
      </div>
    </div>

    <div
      :class="typeFolders != 'Decision' ? 'mt-4' : ''"
      v-if="!isTeacher && typeFolders != 'Task' && loadedTask.type.id == 1"
      class="border border-gray-2 rounded overflow-hidden"
    >
      <div class="background-dark-2 d-flex justify-content-between">
        <div class="ps-3 fs-5 py-2 flex-fill text-primary">Решение</div>
        <div
          class="d-flex align-items-center text-primary"
          v-if="decision.completed.id == 1"
        >
          <div
            style="height: 46px"
            class="cursor-pointer px-3 py-2 primary-hover d-flex align-items-center justify-content-center"
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
            style="height: 46px"
            class="cursor-pointer px-3 py-2 primary-hover d-flex align-items-center justify-content-center"
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
          <template v-if="belonging == null && belonging != undefined">
            <div
              @click.prevent="getDecisionFiles()"
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
          class="text-light text-decoration-none flex-fill d-flex align-items-center justify-content-start cursor-pointer"
          :class="
            (decisionFolders.length - 1 != index ||
              decisionFiles.length != 0) &&
            decisionFolders.length != 0
              ? 'border-bottom border-gray-2'
              : ''
          "
        >
          <div
            class="flex-fill py-2 ps-3 d-flex align-items-center my-hover"
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
            v-if="!isTeacher && decision.completed.id == 1"
            class="text-danger py-2 px-3 danger-hover"
            @click.prevent="destroyDecisionFolder(folder.id)"
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
      <div v-for="(file, index) in decisionFiles" :key="file.id" class="w-100">
        <div
          v-if="decisionFiles != ''"
          class="d-flex align-items-center justify-content-start cursor-pointer"
          :class="
            decisionFiles.length - 1 != index
              ? 'border-bottom border-gray-2 '
              : ''
          "
        >
          <div
            class="flex-fill d-flex align-items-center py-2 ps-3 my-hover"
            @click.prevent="
              toFile(loadedCourse.id, loadedTask.id, file.id, decision.id)
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
            v-if="!isTeacher && decision.completed.id == 1"
            class="text-danger py-2 px-3 danger-hover"
            @click.prevent="destroyDecisionFile(file.id)"
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

    <div
      class="mt-3 d-flex align-items-start"
      v-if="
        !isTeacher &&
        typeFolders != 'Task' &&
        typeFolders != 'Decision' &&
        loadedTask.type.id == 1 &&
        decision.completed.id == 1
      "
    >
      <textarea
        class="p-2 text-light w-100 background-dark-1 rounded form-control border-gray-2 flex-fill"
        ref="textarea"
        @input="resize()"
        @focus="resize()"
        style="min-height: 100px"
        v-model="description"
        type="text"
        name="name"
        placeholder="Описание..."
      ></textarea>
      <div
        v-if="decision.completed.id == 1"
        class="d-flex align-items-center justify-content-center px-3 py-2 cursor-pointer text-primary"
        @click.prevent="updateDecision()"
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
      </div>
    </div>

    <div
      class=""
      v-if="
        !isTeacher &&
        typeFolders != 'Task' &&
        typeFolders != 'Decision' &&
        loadedTask.type.id == 1 &&
        decision.completed.id != 1
      "
    >
      <div class="px-2 mt-4">
        {{ decision.description }}
      </div>
      <div
        :class="decision.description != '' ? 'mt-4' : ''"
        class="mt-4 border border-primary rounded px-3 py-2"
      >
        <div class="d-flex align-items-center py-1">
          <div class="w-100" style="max-width: 130px">Статус:</div>
          <div class="ms-3">{{ decision.completed.title }}</div>
        </div>
        <div class="d-flex align-items-center py-1">
          <div class="w-100" style="max-width: 130px">Оценка:</div>
          <div class="ms-3">
            {{ decision.grade ? decision.grade : "Не назначена" }}
          </div>
        </div>
        <div class="d-flex align-items-center py-1">
          <div class="w-100" style="max-width: 130px">Изменение:</div>
          <div class="ms-3">
            {{ this.$moment.getDateTime(decision.updated_at) }}
          </div>
        </div>
      </div>
      <div class="text-end mt-3 w-100">
        <button class="btn btn-danger" @click.prevent="updateDecision(1)">
          Отменить отправку
        </button>
      </div>
    </div>

    <div
      class="mt-3 text-end"
      v-if="
        !isTeacher &&
        typeFolders != 'Task' &&
        typeFolders != 'Decision' &&
        loadedTask.type.id == 1
      "
    >
      <button
        class="btn btn-primary"
        v-if="decision.completed.id == 1 || decision.completed.id == 4"
        @click.prevent="updateDecision(2)"
      >
        Сдать решение
      </button>
    </div>

    <div
      :class="
        loadedFolders != '' ||
        loadedFiles != '' ||
        loadedTask.description != '' ||
        (belonging != '' && belonging != null && loadedTask.decision)
          ? 'mt-4'
          : ''
      "
      class="border rounded border-prime border-dashed overflow-hidden"
      v-if="isTeacher && decisions != ''"
    >
      <div class="fs-5 background-dark-2 px-3 py-2">Решения</div>
      <div class="" v-for="decision in decisions" :key="decision.id">
        <div
          class="d-flex align-items-center justify-content-start text-primary my-hover"
        >
          <div
            @click.prevent="toDecision(decision.id)"
            class="d-flex align-items-center flex-fill px-3 py-2 cursor-pointer"
          >
            <img
              :src="this.$url + decision.user.information.photo_path"
              alt=""
              style="max-width: 24px; max-height: 24px"
              class="w-100 rounded-circle"
            />
            <div class="ms-3">
              {{ decision.user.name + " " + decision.user.surname }}
            </div>
          </div>
          <div
            v-if="decision && decision.completed.id == 2"
            class="d-flex align-items-center mx-3 my-2"
            style="width: 16px; height: 16px"
          >
            <Popper>
              <div
                class="bg-primary rounded-circle cursor-pointer"
                style="width: 16px; height: 16px"
              ></div>
              <template #content>
                <div class="bg-primary p-2 rounded text-light">
                  Не проверено
                </div>
              </template>
            </Popper>
          </div>
          <div
            v-if="decision && decision.completed.id == 3"
            class="d-flex align-items-center mx-3 my-2"
            style="width: 16px; height: 16px"
          >
            <Popper>
              <div
                class="rounded-circle bg-success cursor-pointer"
                style="width: 16px; height: 16px"
              ></div>
              <template #content>
                <div class="p-2 rounded text-light bg-success">Принято</div>
              </template>
            </Popper>
          </div>
          <div
            v-if="decision && decision.completed.id == 4"
            class="d-flex align-items-center mx-3 my-2"
            style="width: 16px; height: 16px"
          >
            <Popper>
              <div
                class="rounded-circle cursor-pointer"
                style="
                  width: 16px;
                  height: 16px;
                  background-color: rgba(255, 218, 106, 0.7);
                "
              ></div>
              <template #content>
                <div
                  class="p-2 rounded text-light"
                  style="background-color: rgba(255, 218, 106, 0.7)"
                >
                  Возвращено для доработки
                </div>
              </template>
            </Popper>
          </div>
          <div
            v-if="decision && decision.completed.id == 5"
            class="d-flex align-items-center mx-3 my-2"
            style="width: 16px; height: 16px"
          >
            <Popper>
              <div
                class="bg-danger rounded-circle cursor-pointer"
                style="width: 16px; height: 16px"
              ></div>
              <template #content>
                <div class="bg-danger p-2 rounded text-light">Отклонено</div>
              </template>
            </Popper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
