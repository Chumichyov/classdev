<script>
import { mapGetters } from "vuex";
import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";

export default {
  name: "TaskView",

  mounted() {
    // console.log(this.loadedFolders[0] == "");

    // this.$store.dispatch("getTask", {
    //   course: this.$route.params.course,
    //   task: this.$route.params.task,
    // });

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

    // if (this.$route.params.folder) {
    //   this.$store.dispatch("getFiles", {
    //     course: this.$route.params.course,
    //     task: this.$route.params.task,
    //     folder: this.$route.params.folder,
    //   });
    // }
  },

  computed: {
    ...mapGetters([
      "loadedTask",
      "mainFolder",
      "loadedCourse",
      "loadedFiles",
      "loadedFolders",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
      "loadStatusLoadedFiles",
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

      this.$store.dispatch("getTasks", course).then(() => {
        if (
          this.loadStatusLoadedCourse == "READY" &&
          (this.loadStatusLoadedTasks == "READY" ||
            this.loadStatusLoadedTasks == "EMPTY")
        ) {
          this.$router.push({
            name: "course",
            params: {
              course: course,
            },
            query: {
              q: "Task",
            },
          });
        }
      });
    },
  },

  components: {
    LinearPreloaderComponent,
  },
};
</script>

<template>
  <div
    class="pt-4 text-light d-flex align-items-start justify-content-start position-relative"
  >
    <linear-preloader-component
      :load="loadStatusLoadedFiles"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedTask"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedCourse"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedTasks"
    ></linear-preloader-component>

    <div class="flex-fill">
      <nav aria-label="breadcrumb" class="main-px">
        <ol class="breadcrumb">
          <li
            class="breadcrumb-item text-decoration-none cursor-pointer text-primary"
            @click.prevent="toCourse(this.$route.params.course)"
          >
            Курс
          </li>
          <li class="breadcrumb-item active" aria-current="page">Задание</li>
        </ol>
      </nav>

      <div class="main-px points-1 fs-4 pb-4 border-bottom border-gray-1">
        <div
          v-if="loadStatusLoadedTask === 'READY'"
          style="max-width: 768px; height: 39px"
        >
          {{ loadedTask.title }}
        </div>
      </div>
      <div class="main-px mw-900 mt-4">
        <div
          v-if="loadedFolders != '' || loadedFiles != '' || belonging != ''"
          class="border border-gray-1 rounded d-flex flex-column align-items-start overflow-hidden"
        >
          <div
            class="border-bottom border-gray-1 pb-3 px-3 pt-3 fs-5 w-100 background-dark-2"
          >
            Файлы
          </div>

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
                    ? 'border-bottom border-gray-1'
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
                    ? 'border-bottom border-gray-1'
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
                  ? 'border-bottom border-gray-1'
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
                  ? 'border-bottom border-gray-1'
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
          <div
            v-for="(file, index) in loadedFiles"
            :key="file.id"
            class="w-100"
          >
            <div
              v-if="loadedFiles != ''"
              :class="
                loadedFiles.length - 1 != index
                  ? 'border-bottom border-gray-1'
                  : ''
              "
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

        <div
          v-if="loadStatusLoadedMainFiles == 'READY'"
          :class="
            loadedFolders != '' || loadedFiles != '' || belonging != ''
              ? 'mt-4'
              : ''
          "
          class="border border-gray-1 rounded overflow-hidden"
        >
          <div
            class="border-bottom border-gray-1 pb-3 px-3 pt-3 fs-5 background-dark-2"
          >
            Описание
          </div>
          <div class="pb-3 px-3 pt-3">
            {{ loadedTask.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
