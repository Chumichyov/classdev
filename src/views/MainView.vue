<script>
import { mapGetters } from "vuex";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
import NotificationBlockComponent from "@/components/notification/NotificationBlockComponent.vue";
import ModalComponent from "@/components/modal/ModalComponent.vue";

export default {
  name: "MainView",

  computed: {
    ...mapGetters(["notificationsDefault"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },

  components: {
    SidebarComponent,
    NotificationBlockComponent,
    ModalComponent,
  },
};
</script>

<template>
  <div class="d-flex align-items-start justify-content-start overflow-hidden">
    <sidebar-component></sidebar-component>
    <div class="main-px pt-4 w-100 overflow-hidden">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="text-light">Новое в участиях</div>
        <router-link
          to="/notifications?q=Task&all=true"
          class="btn btn-primary text-light px-2 py-1"
        >
          Просмотреть все
        </router-link>
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
      <button class="btn btn-primary" @click.prevent="logout">Выйти</button>
    </div>
  </div>
</template>
