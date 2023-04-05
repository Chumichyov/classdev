<script>
export default {
  name: "NotificationBlockComponent",

  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div
    class="text-decoration-none background-dark-2 rounded-3 w-100 mb-3 mw-500-768 position-relative overflow-hidden"
  >
    <router-link to="/" class="text-decoration-none">
      <div class="p-3">
        <div class="points-1 text-light">
          {{ notification.type.title }}
        </div>
        <div class="points-2 text-light fs-14 mt-2">
          {{ notification.message }}
        </div>
        <div
          class="mt-3 w-100 d-flex align-items-center justify-content-between"
        >
          <img
            class="rounded-circle position-relative w-100"
            style="max-width: 21px; max-height: 21px"
            :src="this.$url + notification.course.leader.information.photo_path"
            alt=""
          />
          <div class="text-primary fs-14" v-if="notification.created_at">
            {{ this.$moment.getDate(notification.created_at) }}
          </div>
        </div>
      </div>
    </router-link>

    <div
      class="position-absolute top-0 bg-primary"
      style="width: 100%; height: 2px"
    ></div>
  </div>
</template>
