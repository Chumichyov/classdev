<template lang="">
  <section>
    <slot
      v-if="
        status_course === $options.LoadingStatuses.Loading ||
        status_notification === $options.LoadingStatuses.Loading ||
        status_auth === $options.LoadingStatuses.Loading
      "
      name="loading"
    >
      <PreloaderView />
    </slot>

    <slot
      v-else-if="
        status_course === $options.LoadingStatuses.Error ||
        status_notification === $options.LoadingStatuses.Error ||
        status_auth === $options.LoadingStatuses.Error
      "
      name="error"
    >
      <HttpCodeError />
    </slot>

    <slot v-else name="content" />

    <!-- v-else-if="status === $options.LoadingStatuses.Ready" -->
    <!-- <slot v-else-if="status === $options.LoadingStatuses.Empty" name="empty">
      <p>Нет данных для отображения</p>
    </slot> -->
  </section>
</template>

<script>
import PreloaderView from "@/views/PreloaderView.vue";
import HttpCodeError from "@/views/HttpCodeError.vue";
import { LoadingStatuses } from "@/types";
export default {
  components: {
    PreloaderView,
    HttpCodeError,
  },

  props: {
    status_course: {
      type: String,
      required: true,
      validator: function (value) {
        return Object.values(LoadingStatuses).includes(value);
      },
    },

    status_notification: {
      type: String,
      required: true,
      validator: function (value) {
        return Object.values(LoadingStatuses).includes(value);
      },
    },

    status_auth: {
      type: String,
      required: true,
      validator: function (value) {
        return Object.values(LoadingStatuses).includes(value);
      },
    },
  },

  LoadingStatuses,
};
</script>
