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
  <router-view class="h-100"></router-view>
</template>
