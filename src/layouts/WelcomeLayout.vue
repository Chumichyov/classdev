<script>
import WelcomeHeader from "../components/header/WelcomeHeader.vue";

export default {
  name: "WelcomeLayout",

  components: {
    WelcomeHeader,
  },
};
</script>

<template>
  <welcome-header />
  <div class="main-px">
    <transition name="slide-fade" mode="out-in">
      <router-view class="" style="" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </transition>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
