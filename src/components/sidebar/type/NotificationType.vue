<script>
export default {
  name: "NotificationType",

  components: {},

  methods: {
    notifications(type) {
      this.$store.dispatch("notifications", {
        page: 1,
        type: type,
        all: this.$route.query.all,
      });
    },
  },
};
</script>

<template>
  <div class="h-100">
    <div class="w-100">
      <router-link
        :to="
          typeof this.$route.query.search != 'undefined'
            ? '/notifications?q=Inbox&search=' +
              this.$route.query.search +
              '&all=' +
              this.$route.query.all
            : '/notifications?q=Inbox' + '&all=' + this.$route.query.all
        "
        @click.prevent="notifications('Inbox')"
        class="my button text-light text-decoration-none border-none w-100 text-start d-flex align-items-center px-3 py-2 rounded"
        :class="this.$route.query.q == 'Inbox' ? 'active' : ''"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-inbox-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"
          />
        </svg>
        <span class="ps-2 fw-normal">Входящие</span></router-link
      >

      <router-link
        @click.prevent="notifications('Course')"
        :to="
          typeof this.$route.query.search != 'undefined'
            ? '/notifications?q=Course&search=' +
              this.$route.query.search +
              '&all=' +
              this.$route.query.all
            : '/notifications?q=Course' + '&all=' + this.$route.query.all
        "
        class="my button text-light text-decoration-none border-none w-100 text-start d-flex align-items-center mt-2 px-3 py-2 rounded"
        :class="this.$route.query.q == 'Course' ? 'active' : ''"
      >
        <img
          src="@/assets/presentation.png"
          alt=""
          style="width: 18px; height: 18px"
        />
        <span class="ps-2 fw-normal">Курсы</span></router-link
      >

      <div class="ms-3 ps-2 border-start">
        <router-link
          @click.prevent="notifications('Task')"
          :to="
            typeof this.$route.query.search != 'undefined'
              ? '/notifications?q=Task&search=' +
                this.$route.query.search +
                '&all=' +
                this.$route.query.all
              : '/notifications?q=Task' + '&all=' + this.$route.query.all
          "
          class="my button text-light text-decoration-none border-none w-100 text-start d-flex align-items-center mt-2 px-3 py-2 rounded"
          :class="this.$route.query.q == 'Task' ? 'active' : ''"
        >
          <img
            src="@/assets/note.png"
            alt=""
            style="width: 18px; height: 18px"
          />
          <span class="ps-2 fw-normal">Задания</span></router-link
        >

        <router-link
          @click.prevent="notifications('Decision')"
          :to="
            typeof this.$route.query.search != 'undefined'
              ? '/notifications?q=Decision&search=' +
                this.$route.query.search +
                '&all=' +
                this.$route.query.all
              : '/notifications?q=Decision' + '&all=' + this.$route.query.all
          "
          class="my button text-light text-decoration-none border-none w-100 text-start d-flex align-items-center mt-2 px-3 py-2 rounded"
          :class="this.$route.query.q == 'Decision' ? 'active' : ''"
        >
          <img
            src="@/assets/check.png"
            alt=""
            style="width: 18px; height: 18px"
          />
          <span class="ps-2 fw-normal">Решения</span></router-link
        >
      </div>

      <router-link
        @click.prevent="notifications('Messenger')"
        :to="
          typeof this.$route.query.search != 'undefined'
            ? '/notifications?q=Messenger&search=' +
              this.$route.query.search +
              '&all=' +
              this.$route.query.all
            : '/notifications?q=Messenger' + '&all=' + this.$route.query.all
        "
        class="my button text-light text-decoration-none border-none w-100 text-start d-flex align-items-center mt-2 px-3 py-2 rounded"
        :class="this.$route.query.q == 'Messenger' ? 'active' : ''"
      >
        <img
          src="@/assets/messenger.png"
          alt=""
          style="width: 18px; height: 18px"
        />
        <span class="ps-2 fw-normal">Мессенджер</span></router-link
      >
    </div>
  </div>
</template>
