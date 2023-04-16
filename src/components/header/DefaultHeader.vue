<script>
import { mapGetters } from "vuex";

export default {
  name: "DefaultHeader",

  computed: {
    ...mapGetters([
      "authUser",
      "loadStatusAuthUser",
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
  <header
    class="background-dark-3 text-light main-px d-flex flex-wrap align-items-center justify-content-between"
    style="min-height: 60px"
  >
    <router-link
      to="/main"
      class="d-flex align-items-center text-light fs-3 py-2 text-decoration-none"
      >Classdev</router-link
    >
    <div class="d-flex align-items-center justify-content-center">
      <div class="me-3 d-flex align-items-center justify-content-center">
        <div @click.prevent="toNotifications" class="d-flex cursor-pointer">
          <img
            src="@/assets/Bell.png"
            alt=""
            style="width: 16px; height: 18px"
          />
        </div>
      </div>
      <div class="me-3 d-flex align-items-center justify-content-center">
        <router-link to="/new" class="d-flex">
          <img
            src="@/assets/Plus.png"
            alt=""
            style="width: 16px; height: 16px"
          />
        </router-link>
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
            class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end border border-gray-1 background-dark-2 py-1 overflow-hidden fs-14"
            style="min-width: 200px"
          >
            <li class="px-3 py-2 border-bottom border-gray-1">
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
  </header>
</template>
