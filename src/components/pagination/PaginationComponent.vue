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
    class="pt-3 w-100 d-flex align-items-center justify-content-center text-light pb-4 border-top border-primary mt-3"
  >
    <!-- -1 -->
    <div class="rounded-30">
      <div
        class="rounded-circle border w-100 h-100 d-flex align-items-center justify-content-center cursor-pointer border-primary text-primary"
        v-if="pagination.current_page !== 1"
        @click.prevent="
          this.$store.dispatch(action, {
            page: pagination.current_page - 1,
            type: this.$route.query.q,
            all: this.$route.query.all,
          })
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
          />
        </svg>
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
              all: this.$route.query.all,
            })
          "
          :class="link.active ? 'active' : ''"
          class="pagination rounded-30 text-primary rounded-circle border border-primary ms-2 user-select-none cursor-pointer fw-bold"
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
        class="rounded-circle border-primary border w-100 h-100 d-flex align-items-center justify-content-center cursor-pointer text-primary"
        v-if="pagination.current_page !== pagination.last_page"
        @click.prevent="
          this.$store.dispatch(action, {
            page: pagination.current_page + 1,
            type: this.$route.query.q,
            all: this.$route.query.all,
          })
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
