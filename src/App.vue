<template>
  <div class="">
    <transition name="fade" mode="out-in">
      <component :is="layout">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </component>
    </transition>
  </div>
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

.fade-enter-active,
.fade-leave-active {
  transition: 600ms ease all;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
