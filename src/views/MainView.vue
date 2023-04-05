<script>
import { mapGetters } from "vuex";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
import NotificationBlockComponent from "@/components/notification/NotificationBlockComponent.vue";

export default {
  name: "MainView",

  mounted() {
    this.$store.dispatch("notifications");
  },

  computed: {
    ...mapGetters(["notifications"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },

  components: {
    SidebarComponent,
    NotificationBlockComponent,
  },
};
</script>

<template>
  <div
    class="d-flex align-items-start justify-content-start min-vh-100 overflow-hidden"
  >
    <sidebar-component></sidebar-component>
    <div class="main-px pt-4 w-100 overflow-hidden">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="text-light">Новое в участиях</div>
        <router-link
          to="/notifications?q=Task"
          class="btn btn-primary text-light px-2 py-1"
        >
          Просмотреть все
        </router-link>
      </div>
      <div
        class="text-light fs-2 w-100 text-center pt-4 pb-5 border-bottom border-gray-1 text-gray-1 text-center"
        v-if="notifications == ''"
      >
        Упс... Похоже здесь нет уведомлений
      </div>
      <div
        class="ps-is pt-3 d-flex align-items-start justify-content-start"
        v-if="notifications != ''"
      >
        <splide :options="this.$splider.options(300)" class="w-100 pb-40">
          <splide-slide
            v-for="notification in notifications"
            :key="notification.id"
          >
            <notification-block-component
              :notification="notification"
            ></notification-block-component>
          </splide-slide>
        </splide>
      </div>
      <!-- <button class="btn btn-primary" @click.prevent="logout">Выйти</button> -->
    </div>
  </div>
</template>
