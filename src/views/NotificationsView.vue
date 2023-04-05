<script>
import { mapGetters, mapMutations } from "vuex";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import NotificationBlockComponent from "@/components/notification/NotificationBlockComponent.vue";

export default {
  name: "NotificationsView",

  data: () => ({
    search: "",
  }),

  mounted() {
    this.$store.dispatch("notifications", {
      page: 1,
      type: this.$route.query.q,
    });

    this.$route.query.search
      ? this.$router.push(`/notifications?q=${this.$route.query.q}`)
      : "";
  },

  computed: {
    ...mapGetters(["notifications"]),
  },

  methods: {
    ...mapMutations(["setNotificationSearch"]),

    newNotifications() {
      let route = "";

      if (this.search !== "") {
        route = `/notifications?q=${this.$route.query.q}&search=${this.search}`;
      } else {
        route = `/notifications?q=${this.$route.query.q}`;
      }

      this.$router.push(route);

      this.setNotificationSearch(this.search);

      this.$store.dispatch("notifications", {
        page: 1,
        type: this.$route.query.q,
      });
    },
  },

  components: {
    PaginationComponent,
    SidebarComponent,
    InputComponent,
    NotificationBlockComponent,
  },
};
</script>

<template>
  <div
    class="d-flex align-items-start justify-content-start min-vh-100 position-relative"
  >
    <sidebar-component></sidebar-component>
    <div class="d-flex w-100 justify-content-center flex-column pt-4">
      <div v-if="notifications != ''" class="main-px mw-768 w-100">
        <div class="">
          <form action="" class="w-100">
            <input-component
              class="w-100"
              v-model="search"
              :name="'search'"
              v-on:input="newNotifications"
            ></input-component>
          </form>
        </div>
        <div class="" style="min-height: 768px">
          <div
            class="pt-4 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
          >
            <div
              class=""
              v-for="notification in notifications"
              :key="notification.id"
            >
              <notification-block-component
                :notification="notification"
              ></notification-block-component>
            </div>
          </div>
        </div>
        <pagination-component :action="'notifications'"></pagination-component>
      </div>
      <div
        v-else
        class="main-px mw-768 w-100 mt-5 fs-2 text-gray-1 text-center"
      >
        Упс... Похоже здесь нет уведомлений
      </div>
    </div>
  </div>
</template>
