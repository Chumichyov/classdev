<script>
import { mapGetters } from "vuex";

export default {
  name: "PaginationComponent",

  props: {
    action: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["pagination"]),
  },
};
</script>

<template>
  <div
    class="pt-3 w-100 d-flex align-items-center justify-content-center text-light pb-4 border-top border-gray-2"
  >
    <!-- -1 -->
    <div class="rounded-30">
      <div
        class="rounded-circle border w-100 h-100 d-flex align-items-center justify-content-center"
        v-if="pagination.current_page !== 1"
        @click.prevent="
          this.$store.dispatch(action, {
            page: pagination.current_page - 1,
            type: this.$route.query.q,
          })
        "
      >
        <img src="../../assets/angle-double-small-left.png" alt="" class="" />
      </div>
    </div>
    <!-- pages -->
    <div v-for="link in pagination.links" :key="link.id">
      <template
        v-if="
          (Number(link.label) &&
            pagination.current_page - link.label < 2 &&
            pagination.current_page - link.label > -2) ||
          Number(link.label) == 1 ||
          Number(link.label) == pagination.last_page
        "
      >
        <div
          @click.prevent="
            this.$store.dispatch(action, {
              page: link.label,
              type: this.$route.query.q,
            })
          "
          :class="link.active ? 'active' : ''"
          class="pagination rounded-30 rounded-circle border ms-2 user-select-none"
        >
          {{ link.label }}
        </div>
      </template>
      <!-- dotted -->
      <template
        v-if="
          (Number(link.label) &&
            pagination.current_page !== 3 &&
            pagination.current_page - link.label === 2) ||
          (Number(link.label) &&
            pagination.current_page !== pagination.last_page - 2 &&
            pagination.current_page - link.label === -2)
        "
      >
        <div
          class="pagination rounded-30 rounded-circle border ms-2 user-select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </div>
      </template>
    </div>
    <!-- +1 -->
    <div class="rounded-30 ms-2">
      <div
        class="rounded-circle border w-100 h-100 d-flex align-items-center justify-content-center"
        v-if="pagination.current_page !== pagination.last_page"
        @click.prevent="
          this.$store.dispatch(action, {
            page: pagination.current_page + 1,
            type: this.$route.query.q,
          })
        "
      >
        <img src="../../assets/angle-double-small-right.png" alt="" class="" />
      </div>
    </div>
  </div>
</template>
