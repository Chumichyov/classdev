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
      all: this.$route.query.all,
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
      <div class="main-px mw-768 w-100">
        <div class="">
          <form action="" class="w-100 d-flex align-items-center">
            <div class="" @click.prevent="newNotifications">
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
              >
                Все
              </router-link>
            </div>
            <div class="" @click.prevent="newNotifications">
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
              >
                Непрочитанные
              </router-link>
            </div>

            <input-component
              class="w-100"
              v-model="search"
              :name="'search'"
              v-on:input="newNotifications"
            ></input-component>
          </form>
        </div>
        <div class="" v-if="notifications != ''">
          <div class="" style="min-height: 989px">
            <div
              class="pt-4 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
            >
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="w-100 mw-500-768"
              >
                <notification-block-component
                  :notification="notification"
                  :dotted="3"
                  :modal="true"
                ></notification-block-component>
              </div>
            </div>
          </div>
          <pagination-component
            :action="'notifications'"
          ></pagination-component>
        </div>
      </div>
      <div
        v-if="notifications == ''"
        class="main-px mw-768 w-100 mt-5 fs-2 text-gray-1 text-center"
      >
        Упс... Похоже здесь нет уведомлений
      </div>
    </div>
  </div>
</template>
