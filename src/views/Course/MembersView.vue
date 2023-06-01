<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CourseMembersView",

  computed: {
    ...mapGetters(["loadedCourse", "leaderPhotoPath", "isTeacher"]),
  },

  methods: {
    ...mapMutations(["setMessenger"]),

    toChat(messenger) {
      this.$store.dispatch("getMessengers", {
        course: this.$route.params.course,
      });

      this.$store
        .dispatch("getMessenger", {
          course: this.$route.params.course,
          messenger,
        })
        .then(() => {
          this.$router.push({
            name: "chat",
            params: {
              course: this.$route.params.course,
              messenger: messenger,
            },
          });
        });
    },
  },
};
</script>

<template>
  <div class="pt-4 text-light position-relative">
    <div class="main-px">
      <div class="mw-900">
        <div
          class="border border-gray-2 rounded pb-2"
          v-if="loadedCourse != ''"
        >
          <div class="fs-5 px-3 py-2">Преподаватель</div>
          <div
            class="d-flex align-items-center w-100 cursor-pointer my-hover"
            style="height: 40px"
          >
            <div
              class="my-2 ms-3 overflow-hidden rounded-circle d-flex align-items-center justify-content-center"
              style="width: 24px; height: 24px"
            >
              <img
                class="position-relative w-100 h-auto"
                :src="
                  this.$url +
                  (loadedCourse.leader && loadedCourse.leader.information
                    ? loadedCourse.leader.information.photo_path
                    : '')
                "
                alt=""
              />
            </div>
            <div class="ms-2 flex-fill py-2">
              {{ loadedCourse.leader.name }}
              {{ loadedCourse.leader.surname }}
            </div>
            <div
              v-if="loadedCourse.messenger"
              class="cursor-pointer d-flex align-items-center justify-content-center px-3 h-100 text-primary primary-hover"
              @click.prevent="toChat(loadedCourse.messenger.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chat-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="border border-gray-2 rounded mt-3"
          v-if="loadedCourse.members && loadedCourse.members[1] != undefined"
        >
          <div class="fs-5 pt-2 px-3">Участники</div>
          <div class="py-2">
            <div
              class="w-100"
              v-for="member in loadedCourse.members"
              :key="member.id"
            >
              <div
                class="d-flex align-items-center w-100 my-hover cursor-pointer"
                v-if="member.id != loadedCourse.leader.id"
                style="height: 40px"
              >
                <div
                  class="ms-3 my-2 rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                  style="width: 24px; height: 24px"
                >
                  <img
                    class="position-relative w-100 h-auto"
                    :src="
                      this.$url +
                      (member.information ? member.information.photo_path : '')
                    "
                    alt=""
                  />
                </div>
                <div class="ms-2 flex-fill py-2">
                  {{ member.name }}
                  {{ member.surname }}
                </div>
                <div
                  v-if="member.messenger && member.messenger[0] && isTeacher"
                  class="cursor-pointer d-flex align-items-center justify-content-center px-3 h-100 text-primary primary-hover"
                  @click.prevent="
                    toChat(
                      member.messenger && member.messenger[0]
                        ? member.messenger[0].id
                        : ''
                    )
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chat-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
