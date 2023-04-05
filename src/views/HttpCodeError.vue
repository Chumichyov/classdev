<script>
import { mapGetters } from "vuex";

export default {
  name: "HttpCodeError",
  computed: {
    ...mapGetters(["error"]),
  },
};
</script>

<template>
  <div
    class="position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center flex-column"
  >
    <div class="">
      <div class="fw-900 text-light text-center" style="font-size: 60px">
        {{ error.status }}
      </div>
      <div class="fs-5 fw-900 text-light text-center">
        {{ error.message }}
      </div>
    </div>
    <div class="mt-4">
      <router-link class="btn btn-primary" v-if="error.status != 401" to="/main"
        >Главная</router-link
      >
      <router-link class="btn btn-primary" v-else to="/login"
        >Авторизация</router-link
      >
    </div>
  </div>
</template>
