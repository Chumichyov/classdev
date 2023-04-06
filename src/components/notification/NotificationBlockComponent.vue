<script>
import ModalComponent from "@/components/modal/ModalComponent.vue";

export default {
  name: "NotificationBlockComponent",

  props: {
    notification: {
      type: Object,
      required: true,
    },

    modal: {
      type: Boolean,
      default: false,
    },

    dotted: {
      type: Number,
      default: 2,
    },
  },

  components: {
    ModalComponent,
  },
};
</script>

<template>
  <modal-component v-if="modal" :notification="notification"></modal-component>
  <div
    class="text-decoration-none background-dark-2 rounded-3 w-100 mb-3 position-relative overflow-hidden"
  >
    <div class="p-3 w-100">
      <div class="points-1 text-light w-100">
        {{ notification.type.title }}
      </div>
      <div class="text-light fs-14 mt-2 w-100" :class="'points-' + dotted">
        {{ notification.message }}
      </div>
      <div class="mt-3 w-100 d-flex align-items-center justify-content-between">
        <div class="text-primary fs-14" v-if="notification.created_at">
          {{ this.$moment.getDate(notification.created_at) }}
        </div>
        <button
          class="btn btn-primary px-2 py-1"
          data-bs-toggle="modal"
          :data-bs-target="'#notification-' + notification.id"
        >
          Подробнее
        </button>
      </div>
    </div>

    <div
      v-if="notification.isRead == 0"
      class="position-absolute top-0 bg-primary"
      style="width: 100%; height: 2px"
    ></div>
  </div>
</template>
