<template>
  <div class="">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import WelcomeLayout from "@/layouts/WelcomeLayout.vue";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    },
  },

  components: {
    WelcomeLayout,
  },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "@/assets/style.css";
</style>
