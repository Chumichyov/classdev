<script>
import { mapGetters } from "vuex";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
import InputComponent from "@/components/InputComponent.vue";

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
    ch() {
      let route = "";

      if (this.search !== "") {
        route = `/notifications?q=${this.$route.query.q}&search=${this.search}`;
      } else {
        route = `/notifications?q=${this.$route.query.q}`;
      }

      this.$router.push(route);
    },
  },

  components: {
    PaginationComponent,
    SidebarComponent,
    InputComponent,
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
          <form action="" class="w-100">
            <input-component
              class="w-100"
              v-model="search"
              :name="'search'"
              v-on:input="ch"
            ></input-component>
          </form>
        </div>
        <div class="" style="min-height: 768px">
          <div
            class="pt-4 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
          >
            <div
              class="background-dark-2 rounded-3 p-3 w-100 mb-3 mw-500-768"
              v-for="notification in notifications"
              :key="notification.id"
            >
              <div class="">
                <!-- <div class="points text-light">
                  {{ notification.course.title }}
                </div> -->
                <div class="points text-light fs-14 mt-2">
                  {{ notification.message }}
                </div>
                <div
                  class="mt-3 w-100 d-flex align-items-center justify-content-between"
                >
                  <img
                    class="rounded-circle position-relative w-100"
                    style="max-width: 21px; max-height: 21px"
                    :src="
                      this.$url +
                      notification.course.leader.information.photo_path
                    "
                    alt=""
                  />
                  <div
                    class="text-primary fs-14"
                    v-if="notification.created_at"
                  >
                    {{ this.$moment.getDate(notification.created_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <pagination-component :action="'notifications'"></pagination-component>
      </div>
    </div>
  </div>
</template>
