<script>
import DefaultHeader from "../components/header/DefaultHeader.vue";
import { mapGetters } from "vuex";
import PreloaderComponent from "@/components/PreloaderComponent.vue";

export default {
  name: "DefaultLayout",

  components: {
    DefaultHeader,
    PreloaderComponent,
  },

  mounted() {
    this.$store.dispatch("indexCourses");
    this.$store.dispatch("notificationsDefault");
    this.$store.dispatch("getAuthUser");
  },

  computed: {
    ...mapGetters([
      "loadStatusCourses",
      "loadStatusNotifications",
      "loadStatusAuthUser",
    ]),
  },
};
</script>

<template>
  <preloader-component
    :status_course="loadStatusCourses"
    :status_notification="loadStatusNotifications"
    :status_auth="loadStatusAuthUser"
    class="position-absolute top-0 bottom-0 start-0 end-0 main-grid vh-100 d-flex flex-column"
  >
    <template #content>
      <default-header />
      <transition name="slide-fade" mode="out-in">
        <router-view class="flex-fill" style="" v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </transition>
    </template>
  </preloader-component>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
