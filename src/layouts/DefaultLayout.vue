<script>
import DefaultHeader from "../components/header/DefaultHeader.vue";
export default {
  name: "DefaultLayout",
  components: {
    DefaultHeader,
  },
};
</script>

<template>
  <default-header />
  <div class="main-px">
    <router-view></router-view>
  </div>
</template>
