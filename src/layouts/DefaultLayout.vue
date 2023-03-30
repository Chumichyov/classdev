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
  <div class="position-relative"></div>
  <default-header
    class="position-absolute top-0 start-0 end-0"
    style="z-index: 100"
  />
  <router-view class="" style="padding-top: 60px"></router-view>
</template>
