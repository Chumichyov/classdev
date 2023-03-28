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
    class="position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center"
  >
    <div class="">
      <div class="fw-900 text-light text-center" style="font-size: 60px">
        {{ error.code }}
      </div>
      <div class="fs-5 fw-900 text-light text-center">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>
