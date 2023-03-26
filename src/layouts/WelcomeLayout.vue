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
    <router-view></router-view>
  </div>
</template>
