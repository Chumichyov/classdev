<script>
import { mapGetters } from "vuex";

export default {
  name: "HttpCodeError",

  data: () => ({
    httpError: "",
  }),

  mounted() {
    this.httpError = this.error;
  },

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
        {{ httpError.status }}
      </div>
      <div class="fs-5 fw-900 text-light text-center">
        {{ httpError.message }}
      </div>
    </div>
    <div class="mt-4">
      <router-link class="btn btn-primary" v-if="httpError.status != 401" to="/"
        >Главная</router-link
      >
      <router-link class="btn btn-primary" v-else to="/login"
        >Авторизация</router-link
      >
    </div>
  </div>
</template>
