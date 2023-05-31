<script>
import { mapGetters } from "vuex";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
// import NotificationBlockComponent from "@/components/notification/NotificationBlockComponent.vue";
import NewCourseModalComponent from "@/components/modal/NewCourseModalComponent.vue";
// import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";
import ModalComponent from "@/components/modal/ModalComponent.vue";
import Popper from "vue3-popper";

export default {
  name: "MainView",

  mounted() {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;
  },

  computed: {
    ...mapGetters([
      "notificationsDefault",
      // "loadStatusLoadedCourse",
      // "loadStatusLoadedTasks",
      "loadStatusLoadedNotifications",
      // "loadStatusLoadedCourses",
      // "loadStatusCreateCourse",
    ]),
  },

  methods: {
    read(notification) {
      this.$store.dispatch("notificationRead", notification);
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

  components: {
    SidebarComponent,
    // NotificationBlockComponent,
    NewCourseModalComponent,
    ModalComponent,
    // LinearPreloaderComponent,
    Popper,
  },
};
</script>

<template>
  <div
    class="d-flex flex-column flex-lg-row align-items-start justify-content-start position-relative vw-100"
  >
    <sidebar-component></sidebar-component>
    <new-course-modal-component></new-course-modal-component>

    <div class="pt-4 flex-fill overflow-hidden w-100-992">
      <div
        class="main-px d-flex align-items-center justify-content-between w-100"
      >
        <div class="text-light d-flex align-items-center">
          <div class="">Уведомления</div>
          <div class="ms-3 text-primary">
            <Popper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-question-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                />
              </svg>
              <template #content>
                <div class="bg-primary p-2 rounded text-light">
                  Последние 10 уведомлений
                </div>
              </template>
            </Popper>
          </div>
        </div>
        <div
          @click.prevent="toNotifications"
          class="btn btn-primary text-light px-2 py-1 cursor-pointer d-sm-block d-none"
        >
          Просмотреть все
        </div>
      </div>
      <div
        class="text-light fs-2 w-100 text-center pt-4 pb-5 border-bottom border-gray-2 text-gray-1 text-center"
        v-if="notificationsDefault == ''"
      >
        Упс... Похоже здесь нет уведомлений
      </div>
      <div class="pt-3 main-px main-px-767" v-if="notificationsDefault != ''">
        <!-- Slider -->
        <!-- <div
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
        </splide> -->
        <div
          @click.prevent="read(notification.id)"
          :data-bs-target="'#notification-' + notification.id"
          data-bs-toggle="modal"
          class="py-2 text-light cursor-pointer"
          :class="[
            {
              'background-dark-2': !(index % 2),
              'rounded-top': index == 0,
              'rounded-bottom': index + 1 == notificationsDefault.length,
            },
          ]"
          v-for="(notification, index) in notificationsDefault"
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
            <div class="points-1 text-gray-1">{{ notification.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
