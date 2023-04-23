<script>
import { mapGetters } from "vuex";

export default {
  name: "TaskView",

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
      "belonging",
    ]),
  },

  methods: {
    getFiles(folder = null) {
      if (folder !== null) {
        this.$store.dispatch("getFiles", {
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

    toFile(course, task, file) {
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
    },
  },

  components: {},
};
</script>

<template>
  <div class="main-px mw-900 my-4">
    <div
      class="border border-gray-2 rounded d-flex flex-column align-items-start overflow-hidden"
      v-if="
        loadedFolders != '' ||
        loadedFiles != '' ||
        belonging != '' ||
        (authUser != '' && authUser.id == loadedCourse.leader.id)
      "
    >
      <div
        class="border-gray-2 px-3 fs-5 w-100 background-dark-2 d-flex align-items-center"
        :class="
          loadedFolders != '' ||
          loadedFiles != '' ||
          belonging != '' ||
          (authUser != '' && authUser.id == loadedCourse.leader.id)
            ? 'border-bottom'
            : ''
        "
      >
        <div class="flex-fill py-2">Файлы</div>
        <div
          class="d-flex align-items-center text-primary ps-3 border-start border-gray-2 py-2"
          v-if="authUser != '' && authUser.id == loadedCourse.leader.id"
        >
          <div class="cursor-pointer">
            <button class="btn btn-primary text-light py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            </button>
          </div>
          <div class="ms-2 cursor-pointer">
            <button class="btn btn-primary text-light py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            </button>
          </div>
        </div>
      </div>
      <div
        class="w-100"
        v-if="loadedFolders != '' || loadedFiles != '' || belonging != ''"
      >
        <div class="w-100" v-if="belonging != ''">
          <template v-if="belonging == null && belonging != undefined">
            <router-link
              :to="{
                name: 'task',
                params: {
                  course: loadedCourse.id,
                  task: loadedTask.id,
                },
              }"
              @click.prevent="getFiles()"
              class="text-light text-decoration-none my-hover flex-fill align-items-center w-100 d-flex py-2 px-3"
              style="height: 47px"
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
            </router-link>
          </template>

          <template v-if="belonging && belonging != undefined">
            <router-link
              :to="
                belonging.original_name == 'files'
                  ? {
                      name: 'task',
                      params: {
                        course: loadedCourse.id,
                        task: loadedTask.id,
                      },
                    }
                  : {
                      name: 'folder',
                      params: {
                        course: loadedCourse.id,
                        task: loadedTask.id,
                        folder: belonging.id,
                      },
                    }
              "
              @click.prevent="getFiles(belonging.id)"
              class="text-light text-decoration-none my-hover flex-fill align-items-center w-100 d-flex py-2 px-3"
              style="height: 47px"
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
            </router-link>
          </template>
        </div>

        <!-- Folders -->
        <div
          v-for="(folder, index) in loadedFolders"
          :key="folder.id"
          class="w-100"
        >
          <router-link
            v-if="loadedFolders != '' && folder.original_name != 'files'"
            :to="{
              name: 'folder',
              params: {
                course: loadedCourse.id,
                task: loadedTask.id,
                folder: folder.id,
              },
            }"
            @click.prevent="getFiles(folder.id)"
            class="text-light my-hover text-decoration-none flex-fill d-flex align-items-center justify-content-start py-2 px-3"
            :class="
              loadedFolders.length - 1 != index || loadedFiles.length != 0
                ? 'border-bottom border-gray-2'
                : ''
            "
          >
            <div class="fs-5">
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
          </router-link>

          <!-- <div
              v-if="folder.is_empty"
              class="text-light text-decoration-none flex-fill d-flex align-items-center justify-content-start py-1 px-3 my-hover"
              :class="
                loadedFolders.length - 1 != index || loadedFiles.length != 0
                  ? 'border-bottom border-gray-2'
                  : ''
              "
            >
              <div class="fs-5 text-gray-1">
                <i class="bi bi-folder-fill"></i>
              </div>

              <div class="ms-3 text-gray-1">
                {{ folder.original_name }}
              </div>
            </div> -->
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
            @click.prevent="toFile(loadedCourse.id, loadedTask.id, file.id)"
            class="d-flex my-hover align-items-center justify-content-start py-2 px-3 cursor-pointer"
          >
            <div class="fs-5">
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
      <div class="p-3 w-100 text-center fs-18" v-else>Файлы отсутствуют</div>
    </div>

    <div
      v-if="loadStatusLoadedMainFiles == 'READY'"
      :class="
        loadedFolders != '' ||
        loadedFiles != '' ||
        belonging != '' ||
        (authUser != '' && authUser.id == loadedCourse.leader.id)
          ? 'mt-4'
          : ''
      "
      class="border border-gray-2 rounded overflow-hidden"
    >
      <div class="border-bottom border-gray-2 px-3 py-2 fs-5 background-dark-2">
        Описание
      </div>
      <div class="pb-3 px-3 pt-3">
        {{ loadedTask.description }}
      </div>
    </div>
  </div>
</template>
