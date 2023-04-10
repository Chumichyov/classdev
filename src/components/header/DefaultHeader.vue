<script>
import { mapGetters } from "vuex";

export default {
  name: "DefaultHeader",

  computed: {
    ...mapGetters(["authUser", "loadStatusAuthUser"]),
  },
};
</script>

<template>
  <header
    class="background-dark-3 text-light main-px d-flex flex-wrap align-items-center justify-content-between"
    style="min-height: 60px"
  >
    <router-link
      to="/main"
      class="d-flex align-items-center text-light fs-3 py-2 text-decoration-none"
      >Classdev</router-link
    >
    <div class="d-flex align-items-center justify-content-center">
      <div class="me-3 d-flex align-items-center justify-content-center">
        <router-link to="/notifications?q=Inbox&all=true" class="d-flex">
          <img
            src="@/assets/Bell.png"
            alt=""
            style="width: 16px; height: 18px"
          />
        </router-link>
      </div>
      <div class="me-3 d-flex align-items-center justify-content-center">
        <router-link to="/new" class="d-flex">
          <img
            src="@/assets/Plus.png"
            alt=""
            style="width: 16px; height: 16px"
          />
        </router-link>
      </div>
      <div class="">
        <div
          class="d-flex align-items-center justify-content-start"
          style="width: 24px; height: 24px"
        >
          <img
            v-if="loadStatusAuthUser === 'READY'"
            class="rounded-circle position-relative w-100"
            alt=""
            :src="this.$url + authUser.information.photo_path"
            style="width: 24px; height: 24px"
          />
        </div>
      </div>
    </div>
  </header>
</template>
