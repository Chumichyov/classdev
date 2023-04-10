<script>
export default {
  name: "LinearPreloaderComponent",

  props: {
    load: {
      type: String,
      required: true,
    },

    load_2: {
      type: String,
      required: false,
    },
  },
};
</script>

<template>
  <div
    class="linear-loader blue position-absolute top-0 start-0 end-0"
    v-if="(this.load_2 && this.load_2 === 'LOADING') || this.load === 'LOADING'"
  >
    <div class=""></div>
  </div>
</template>
