<script>
import { mapGetters } from "vuex";

export default {
  name: "LinearPreloaderComponent",

  computed: {
    ...mapGetters([
      "loadStatusLoadedCourse",
      "loadStatusCreateCourse",
      "loadStatusLoadedCourses",
      "loadStatusLoadedTasks",
      "loadStatusLoadedTask",
      "loadStatusCreateTask",
      "loadStatusAuthUser",
      "loadStatusLoadedFiles",
      "loadStatusLoadedFile",
      "loadStatusLoadedMainFiles",
      "loadStatusLoadedNotifications",
      "loadStatusUpdateCourse",
      "loadStatusUpdateTask",
      "loadStatusUpdateFile",
      "loadStatusUpdateFolder",
      "loadStatusLoadedDecision",
      "loadStatusLoadedDecisionFiles",
      "loadStatusStoreFile",
      "loadStatusStoreReview",
      "loadStatusUpdateReview",
      "loadStatusUpdateDecision",
      "loadStatusLoadedMessengers",
      "loadStatusUpdateUser",
      "loadStatusLoadedMessenger",
    ]),
  },
};
</script>

<template>
  <div
    class="linear-loader blue position-absolute bottom-0 start-0 end-0"
    v-if="
      loadStatusLoadedCourse == 'LOADING' ||
      loadStatusCreateCourse == 'LOADING' ||
      loadStatusLoadedCourses == 'LOADING' ||
      loadStatusLoadedTasks == 'LOADING' ||
      loadStatusLoadedTask == 'LOADING' ||
      loadStatusCreateTask == 'LOADING' ||
      loadStatusAuthUser == 'LOADING' ||
      loadStatusLoadedFiles == 'LOADING' ||
      loadStatusLoadedFile == 'LOADING' ||
      loadStatusLoadedMainFiles == 'LOADING' ||
      loadStatusLoadedNotifications == 'LOADING' ||
      loadStatusUpdateCourse == 'LOADING' ||
      loadStatusUpdateTask == 'LOADING' ||
      loadStatusUpdateFile == 'LOADING' ||
      loadStatusUpdateFolder == 'LOADING' ||
      loadStatusLoadedDecision == 'LOADING' ||
      loadStatusStoreFile == 'LOADING' ||
      loadStatusUpdateDecision == 'LOADING' ||
      loadStatusStoreReview == 'LOADING' ||
      loadStatusUpdateReview == 'LOADING' ||
      loadStatusLoadedMessengers == 'LOADING' ||
      loadStatusLoadedMessenger == 'LOADING' ||
      loadStatusUpdateUser == 'LOADING' ||
      loadStatusLoadedDecisionFiles == 'LOADING'
    "
  >
    <div class=""></div>
  </div>
</template>
