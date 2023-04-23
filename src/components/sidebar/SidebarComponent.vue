<script>
import DefaultType from "./type/DefaultType.vue";
import NotificationType from "./type/NotificationType.vue";

export default {
  name: "SidebarComponent",

  computed: {
    sidebar() {
      return this.$route.meta.sidebar + "-type";
    },
  },

  components: {
    DefaultType,
    NotificationType,
  },
};
</script>

<template>
  <div
    class="sidebar w-100 background-dark-2 main-px w-100 pt-4 pb-4 h-100-992 mw-330"
  >
    <component :is="sidebar">
      <router-view></router-view>
    </component>
  </div>
</template>
