<script>
import { mapGetters } from "vuex";
import NewCourseModalComponent from "../modal/NewCourseModalComponent.vue";
import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";

export default {
  name: "DefaultHeader",

  components: {
    NewCourseModalComponent,
    LinearPreloaderComponent,
  },

  computed: {
    ...mapGetters([
      "authUser",
      "haveUnread",
      "loadStatusLoadedCourse",
      "loadStatusCreateCourse",
      "loadStatusLoadedCourses",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
      "loadStatusCreateTask",
      "loadStatusAuthUser",
      "loadStatusLoadedFiles",
      "loadStatusLoadedFile",
      "loadStatusLoadedMainFiles",
      "loadStatusLoadedNotifications",
    ]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },

    toNotifications() {
      this.$store
        .dispatch("notifications", {
          page: 1,
          type: "Inbox",
          all: "true",
        })
        .then(() => {
          if (
            this.loadStatusLoadedNotifications == "READY" ||
            this.loadStatusLoadedNotifications == "EMPTY"
          ) {
            this.$router.push({
              name: "notifications",
              query: {
                q: "Inbox",
                all: "true",
              },
            });
          }
        });
    },
  },
};
</script>

<template>
  <new-course-modal-component></new-course-modal-component>
  <header
    class="background-dark-3 text-light main-px d-flex flex-wrap align-items-center justify-content-between position-relative"
    style="min-height: 60px"
  >
    <router-link
      to="/main"
      class="d-flex align-items-center text-light fs-3 py-2 text-decoration-none"
      >Classdev</router-link
    >
    <div class="d-flex align-items-center justify-content-center">
      <div class="me-3 d-flex align-items-center justify-content-center">
        <div
          @click.prevent="toNotifications"
          class="d-flex cursor-pointer position-relative align-items-center"
        >
          <img
            src="@/assets/Bell.png"
            alt=""
            style="width: 16px; height: 18px"
          />
          <div
            v-if="haveUnread"
            class="position-absolute rounded-circle bg-primary"
            style="width: 8px; height: 8px; top: -2px; right: -2px"
          ></div>
        </div>
      </div>
      <div class="me-3 d-flex align-items-center justify-content-center">
        <div class="btn-group">
          <div class="d-flex align-items-center justify-content-start">
            <img
              src="@/assets/Plus.png"
              alt=""
              style="width: 16px; height: 16px"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            />

            <ul
              class="dropdown-menu dropdown-menu-dark dropdown-menu-end border border-gray-2 background-dark-2 py-1 overflow-hidden fs-14"
              style="min-width: 200px"
            >
              <li
                class="px-3 py-2 my-hover cursor-pointer text-light"
                data-bs-toggle="modal"
                data-bs-target="#newCourse"
              >
                Создать курс
              </li>

              <li class="px-3 py-2 my-hover cursor-pointer text-light">
                Вступить в курс
              </li>
              <!-- <li class="border-bottom border-gray-2"></li> -->
              <!-- <li
                class="px-3 py-2 my-hover d-flex align-items-center cursor-pointer"
              >
                Создать группу
              </li>
              <li
                class="px-3 py-2 my-hover d-flex align-items-center cursor-pointer"
              >
                Вступить в группу
              </li> -->
            </ul>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <div
          class="d-flex align-items-center justify-content-start"
          style="width: 24px; height: 24px"
        >
          <img
            v-if="loadStatusAuthUser === 'READY'"
            class="rounded-circle position-relative w-100"
            alt=""
            :src="this.$url + authUser.information.photo_path"
            style="width: 24px; height: 24px"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
          />
          <ul
            class="dropdown-menu dropdown-menu-dark dropdown-menu-end border border-gray-2 background-dark-2 py-1 overflow-hidden fs-14"
            style="min-width: 200px"
          >
            <li class="px-3 py-2 border-bottom border-gray-2">
              {{ authUser.name + " " + authUser.surname }}
            </li>

            <li class="mt-2 px-3 py-1 my-hover cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
                />
              </svg>
              <span class="ms-2 cursor-pointer">Профиль</span>
            </li>
            <!-- <li class="my-2 border-bottom border-gray-1"></li> -->
            <li
              class="px-3 py-1 my-hover d-flex align-items-center mt-1 cursor-pointer"
              @click.prevent="logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              <span class="ms-2 cursor-pointer">Выход</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <linear-preloader-component
      :load="loadStatusLoadedCourse"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusCreateCourse"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedCourses"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedTasks"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedTask"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusCreateTask"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedFiles"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedFile"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedMainFiles"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedNotifications"
    ></linear-preloader-component>
  </header>
</template>
