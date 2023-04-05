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
    class="sidebar background-dark-2 main-px w-100 pt-4 pb-4 h-100"
    style="max-width: 330px"
  >
    <component :is="sidebar">
      <router-view></router-view>
    </component>
  </div>
</template>
