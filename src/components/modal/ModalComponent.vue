<script>
import { mapGetters } from "vuex";

export default {
  name: "ModalComponent",

  props: {
    notification: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters([
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
    ]),
  },

  methods: {
    toCourse(course) {
      this.$store.dispatch("getCourse", course);
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

    toTask(course, task, folder = null) {
      this.$store.dispatch("getCourse", course);
      this.$store.dispatch("getTask", { course, task }).then(() => {
        if (
          folder == null &&
          this.loadStatusLoadedCourse == "READY" &&
          this.loadStatusLoadedTask == "READY"
        ) {
          this.$router.push({
            name: "task",
            params: {
              course: course,
              task: task,
            },
          });
        }
      });

      if (folder != null) {
        this.$store.dispatch("getFiles", { course, task, folder }).then(() => {
          if (
            this.loadStatusLoadedCourse == "READY" &&
            this.loadStatusLoadedTask == "READY"
          ) {
            this.$router.push({
              name: "task",
              params: {
                course: course,
                task: task,
              },
            });
          }
        });
      }
    },
  },
};
</script>

<template>
  <div class="" v-if="notification">
    <!-- Новое задание -->
    <div
      v-if="notification.type.title == 'Новое задание'"
      class="modal fade"
      :id="'notification-' + notification.id"
      data-bs-keyboard="false"
      data-bs-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content background-dark-1">
          <div class="modal-header border-0">
            <h5 class="modal-title text-light">
              {{ notification.type.title }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body pt-0 border-0 text-light fw-normal">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li
                  class="breadcrumb-item text-decoration-none cursor-pointer"
                  data-bs-dismiss="modal"
                  @click.prevent="toCourse(notification.course.id)"
                >
                  Курс
                </li>
                <li
                  class="breadcrumb-item points-1 text-decoration-none cursor-pointer"
                  data-bs-dismiss="modal"
                  @click.prevent="
                    toTask(
                      notification.course.id,
                      notification.task.id,
                      notification.task.folders != ''
                        ? notification.task.folders[0].id
                        : null
                    )
                  "
                >
                  Задание
                </li>
              </ol>
            </nav>
            <div class="mb-2">
              {{ notification.task.title }}
            </div>
            <div class="fs-14 points-6">
              {{ notification.task.description }}
            </div>
          </div>
          <div
            class="modal-footer border-0 d-flex align-items-center justify-content-between"
          >
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
            <button type="button" class="btn btn-primary">Открыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
