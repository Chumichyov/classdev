<script>
import { mapGetters } from "vuex";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";

export default {
  name: "MainView",

  mounted() {
    this.$store.dispatch("allCourses");
    this.$store.dispatch("notifications");
  },

  computed: {
    ...mapGetters(["courses", "notifications"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },

  components: {
    SidebarComponent,
  },
};
</script>

<template>
  <div class="d-flex align-items-start justify-content-start h-100">
    <sidebar-component :courses="courses"></sidebar-component>
    <div class="main main-px pt-4 w-100 overflow-hidden">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="text-light">Новое в участиях</div>
        <router-link to="/" class="btn btn-primary text-light px-2 py-1">
          Просмотреть все
        </router-link>
      </div>
      <div
        class="text-light fs-1 w-100 text-center pt-4 pb-5 border-bottom border-gray-1"
        v-if="notifications == ''"
      >
        Ничего нет
      </div>
      <div
        class="ps-is pt-3 d-flex align-items-start justify-content-start"
        v-if="notifications != ''"
      >
        <splide :options="this.$splider.options(300)" class="w-100 pb-30">
          <splide-slide
            v-for="notification in notifications"
            :key="notification.id"
          >
            <router-link to="/" class="text-decoration-none">
              <div class="background-dark-2 rounded-3 p-3">
                <div class="points text-light">
                  {{ notification.course.title }}
                </div>
                <div class="points text-light fs-14 mt-2">
                  {{ notification.task.title }}
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
            </router-link>
          </splide-slide>
        </splide>
      </div>
      <!-- <button class="btn btn-primary" @click.prevent="logout">Выйти</button> -->
    </div>
  </div>
</template>
