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
    class="position-absolute top-0 bottom-0 start-0 end-0 main-grid"
  >
    <template #content>
      <default-header class="" style="z-index: 100" />
      <router-view class="" style="" v-slot="{ Component }">
        <!-- <transition name="fade" mode="out-in"> -->
        <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </template>
  </preloader-component>
</template>
