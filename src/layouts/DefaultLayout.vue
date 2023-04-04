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
  <default-header class="" style="z-index: 100" />
  <router-view class="" style=""></router-view>
</template>
