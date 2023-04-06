<script>
export default {
  name: "DefaultHeader",

  methods: {
    notifications(type) {
      this.$store.dispatch("notifications", {
        page: 1,
        type: type,
      });
    },
  },
};
</script>

<template>
  <header
    class="background-dark-3 text-light main-px d-flex flex-wrap align-items-center justify-content-between"
    style="min-height: 60px"
  >
    <router-link
      to="/"
      class="d-flex align-items-center text-light fs-3 py-2 text-decoration-none"
      >Classdev</router-link
    >
    <div class="d-flex align-items-center justify-content-center">
      <div class="me-3 d-flex align-items-center justify-content-center">
        <router-link
          to="/notifications?q=Inbox&all=true"
          class="d-flex"
          @click.prevent="notifications('Inbox')"
        >
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
          class="border rounded-circle"
          style="width: 24px; height: 24px"
        ></div>
      </div>
    </div>
  </header>
</template>
