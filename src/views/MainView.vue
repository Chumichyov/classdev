<script>
import { mapGetters } from "vuex";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
import NotificationBlockComponent from "@/components/notification/NotificationBlockComponent.vue";
import ModalComponent from "@/components/modal/ModalComponent.vue";
import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";

export default {
  name: "MainView",

  computed: {
    ...mapGetters([
      "notificationsDefault",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "loadStatusLoadedNotifications",
    ]),
  },

  methods: {
    toNotifications() {
      this.$store
        .dispatch("notifications", {
          page: 1,
          type: "Task",
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
                q: "Task",
                all: "true",
              },
            });
          }
        });
    },
  },

  components: {
    SidebarComponent,
    NotificationBlockComponent,
    ModalComponent,
    LinearPreloaderComponent,
  },
};
</script>

<template>
  <div
    class="d-flex align-items-start justify-content-start overflow-hidden position-relative"
  >
    <linear-preloader-component
      :load="loadStatusLoadedCourse"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedTasks"
    ></linear-preloader-component>

    <linear-preloader-component
      :load="loadStatusLoadedNotifications"
    ></linear-preloader-component>

    <sidebar-component></sidebar-component>

    <div class="main-px pt-4 w-100 overflow-hidden">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="text-light">Новое в участиях</div>
        <div
          @click.prevent="toNotifications"
          class="btn btn-primary text-light px-2 py-1 cursor-pointer"
        >
          Просмотреть все
        </div>
      </div>
      <div
        class="text-light fs-2 w-100 text-center pt-4 pb-5 border-bottom border-gray-1 text-gray-1 text-center"
        v-if="notificationsDefault == ''"
      >
        Упс... Похоже здесь нет уведомлений
      </div>
      <div
        class="pt-3 d-flex align-items-start justify-content-start"
        v-if="notificationsDefault != ''"
      >
        <div
          class=""
          v-for="notification in notificationsDefault"
          :key="notification.id"
        >
          <modal-component :notification="notification"></modal-component>
        </div>
        <splide
          :options="this.$splider.options(300)"
          class="w-100 pb-40 position-relative"
        >
          <splide-slide
            class="position-relative"
            v-for="notification in notificationsDefault"
            :key="notification.id"
          >
            <notification-block-component
              :notification="notification"
              :dotted="2"
            ></notification-block-component>
          </splide-slide>
        </splide>
      </div>
    </div>
  </div>
</template>
