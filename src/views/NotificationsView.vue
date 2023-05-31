<script>
import { mapGetters, mapMutations } from "vuex";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
import ModalComponent from "@/components/modal/ModalComponent.vue";

// import NotificationBlockComponent from "@/components/notification/NotificationBlockComponent.vue";
// import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";

export default {
  name: "NotificationsView",

  data: () => ({
    search: "",
  }),

  mounted() {
    this.$route.query.search
      ? this.$router.push(
          `/notifications?q=${this.$route.query.q}&all=${this.$route.query.all}`
        )
      : "";

    if (this.loadStatusLoadedNotifications != "READY") {
      this.$store.dispatch("notifications", {
        page: 1,
        type: this.$route.query.q,
        all: this.$route.query.all,
      });
    }
  },

  computed: {
    ...mapGetters(["notifications", "loadStatusLoadedNotifications"]),
  },

  methods: {
    ...mapMutations(["setNotificationSearch"]),

    read(notification) {
      this.$store.dispatch("notificationRead", notification);
    },

    newNotifications() {
      let route = "";

      if (this.search !== "") {
        route = `/notifications?q=${this.$route.query.q}&search=${this.search}&all=${this.$route.query.all}`;
      } else {
        route = `/notifications?q=${this.$route.query.q}&all=${this.$route.query.all}`;
      }

      this.$router.push(route);

      this.setNotificationSearch(this.search);

      this.$store.dispatch("notifications", {
        page: 1,
        type: this.$route.query.q,
        all: this.$route.query.all,
      });
    },
  },

  components: {
    PaginationComponent,
    SidebarComponent,
    ModalComponent,
    // NotificationBlockComponent,
  },
};
</script>

<template>
  <div
    class="d-lg-flex align-items-start justify-content-start position-relative"
  >
    <sidebar-component></sidebar-component>
    <div class="d-flex w-100 justify-content-center flex-column pt-4">
      <div class="w-100">
        <div class="header main-px">
          <div action class="w-100 d-flex align-items-center">
            <div class @click.prevent="newNotifications">
              <router-link
                :to="
                  typeof this.$route.query.search != 'undefined'
                    ? '/notifications?q=' +
                      this.$route.query.q +
                      '&search=' +
                      this.$route.query.search +
                      '&all=true'
                    : '/notifications?q=' + this.$route.query.q + '&all=true'
                "
                class="my button text-light border-0 me-2 background-dark-1 px-2 py-1 rounded text-decoration-none"
                :class="this.$route.query.all == 'true' ? 'active' : ''"
                >Все</router-link
              >
            </div>
            <div class @click.prevent="newNotifications">
              <router-link
                :to="
                  typeof this.$route.query.search != 'undefined'
                    ? '/notifications?q=' +
                      this.$route.query.q +
                      '&search=' +
                      this.$route.query.search +
                      '&all=false'
                    : '/notifications?q=' + this.$route.query.q + '&all=false'
                "
                class="my button text-light border-0 me-2 background-dark-1 px-2 py-1 rounded text-decoration-none"
                :class="this.$route.query.all == 'false' ? 'active' : ''"
                >Непрочитанные</router-link
              >
            </div>
            <div class="d-flex align-items-center flex-fill">
              <input
                style="height: 34px"
                type="text"
                class="form-control border-gray-2 bg-transparent flex-fill text-light"
                placeholder="Поиск..."
                v-model="search"
              />
              <button
                @click.prevent="newNotifications()"
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
        </div>
        <div v-if="notifications != ''" class="main-px main-px-767">
          <div style="min-height: 624px">
            <div
              class="pt-4 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
            >
              <!-- <div
                v-for="notification in notifications"
                :key="notification.id"
                class="w-100 mw-500-768 d-flex"
              >
                <notification-block-component
                  :notification="notification"
                  :dotted="2"
                  :modal="true"
                ></notification-block-component>
              </div> -->
              <div
                @click.prevent="read(notification.id)"
                :data-bs-target="'#notification-' + notification.id"
                data-bs-toggle="modal"
                class="py-2 text-light cursor-pointer w-100"
                :class="[
                  {
                    'background-dark-2': !(index % 2),
                    'rounded-top': index == 0,
                    'rounded-bottom': index + 1 == notifications.length,
                  },
                ]"
                v-for="(notification, index) in notifications"
                :key="notification.id"
              >
                <modal-component :notification="notification"></modal-component>
                <div class="d-md-flex align-items-center px-3">
                  <div
                    class="flex-shrink-0 text-light d-flex align-items-center"
                    style="width: 210px"
                    v-if="notification.type"
                  >
                    <div
                      class="rounded-circle"
                      :class="[
                        {
                          'bg-primary': !notification.isRead,
                        },
                      ]"
                      style="width: 10px; height: 10px"
                    ></div>
                    <div class="ms-2">
                      {{ notification.type.title }}
                    </div>
                  </div>
                  <div class="points-1 text-gray-1">
                    {{ notification.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pagination-component
            :action="'notifications'"
          ></pagination-component>
        </div>
        <div
          v-if="
            loadStatusLoadedNotifications === 'EMPTY' || notifications == ''
          "
          class="main-px mw-768 w-100 mt-5 fs-2 text-gray-1 text-center"
        >
          Упс... Похоже здесь нет уведомлений
        </div>
      </div>
    </div>
  </div>
</template>
