<template>
  <div class="">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import WelcomeLayout from "@/layouts/WelcomeLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    },
  },

  components: {
    WelcomeLayout,
    EmptyLayout,
  },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "@/assets/style.css";
</style>
