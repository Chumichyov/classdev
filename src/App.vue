<template>
  <suspense>
    <template #default>
      <div class="h-100">
        <component :is="layout">
          <router-view></router-view>
        </component>
      </div>
    </template>
    <template #fallback>
      <p class="text-primary">Loading</p>
    </template>
  </suspense>
</template>

<script>
import WelcomeLayout from "@/layouts/WelcomeLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    },
  },

  components: {
    WelcomeLayout,
    EmptyLayout,
    DefaultLayout,
  },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "@/assets/style.css";
@import "@splidejs/splide/dist/css/themes/splide-default.min.css";
</style>
