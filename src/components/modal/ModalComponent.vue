<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";

export default {
  name: "ModalComponent",

  data: () => ({
    v$: useVuelidate(),
  }),

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
    toCourse(course, type = "tasks") {
      console.log(course);
      this.$store.dispatch("getCourse", course);
      this.$store
        .dispatch("getTasks", {
          course: course,
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
              name: "course." + type,
              params: {
                course: course,
              },
            });
          }
        });
    },

    toTask(course, task, folder = null) {
      this.$store.dispatch("getCourse", course);
      this.$store
        .dispatch("getTask", {
          course: course,
          task: task,
        })
        .then(() => {
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
  <!-- Новое задание -->
  <div
    v-if="notification && notification.type.id == 3"
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
        <div class="modal-body py-0 border-0 text-light fw-normal">
          <nav aria-label="breadcrumb background-primary rounded">
            <ol class="breadcrumb background-primary px-3 py-2 rounded">
              <li
                class="breadcrumb-item text-decoration-none cursor-pointer text-light"
                data-bs-dismiss="modal"
                @click.prevent="toCourse(notification.course.id)"
              >
                Курс
              </li>
              <li
                class="breadcrumb-item points-1 text-decoration-none cursor-pointer text-light"
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
          <div class="mb-2 fs-18">
            {{ notification.task.title }}
          </div>
          <div class="points-3 mb-3">
            В курсе '{{ notification.course.title }}' выложено новое задание:
            {{ notification.task.title }}
          </div>
          <div
            class="bg-primary px-3 py-2 rounded d-flex align-items-center"
            v-if="notification.task.folders != ''"
          >
            <!-- data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample" -->
            <div class="flex-fill">Прикреплены файлы</div>
            <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                />
              </svg> -->
          </div>
          <!-- <div class="collapse mt-2" id="collapseExample">
              <div class="card card-body background-dark-1 border-0">
                Some placeholder content for the collapse component. This panel
                is hidden by default but revealed when the user activates the
                relevant trigger.
              </div>
            </div> -->
        </div>
        <div
          class="modal-footer border-0 d-flex align-items-center justify-content-end"
        >
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Новый участник -->
  <div
    v-if="notification && notification.type.id == 2"
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
        <div class="modal-body py-0 border-0 text-light fw-normal">
          <nav aria-label="breadcrumb background-primary rounded">
            <ol class="breadcrumb background-primary py-2 px-3 rounded">
              <li
                class="breadcrumb-item text-decoration-none cursor-pointer text-light"
                data-bs-dismiss="modal"
                @click.prevent="toCourse(notification.course.id, 'members')"
              >
                Курс
              </li>
            </ol>
          </nav>
          <div class="mb-2 points-1 fs-18">
            {{ notification.course.title }}
          </div>
          <div class="points-3">
            В курсе '{{ notification.course.title }}' появился новый участник:
            {{ notification.user.name }} {{ notification.user.surname }}
          </div>
        </div>
        <div
          class="modal-footer border-0 d-flex align-items-center justify-content-end"
        >
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
li::before {
  color: #fff !important;
}
</style>
