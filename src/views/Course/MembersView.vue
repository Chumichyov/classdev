<script>
import { mapGetters } from "vuex";

export default {
  name: "CourseMembersView",

  computed: {
    ...mapGetters(["loadedCourse", "leaderPhotoPath"]),
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
            class="py-2 pb-2 d-flex align-items-center w-100 px-3 cursor-pointer my-hover"
          >
            <div class="" style="width: 24px; height: 24px">
              <img
                style="width: 24px; height: 24px"
                class="rounded-circle position-relative w-100"
                :src="this.$url + leaderPhotoPath"
                alt=""
              />
            </div>
            <div class="ms-2">
              {{ loadedCourse.leader.name }}
              {{ loadedCourse.leader.surname }}
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
                class="d-flex align-items-center w-100 px-3 py-2 my-hover cursor-pointer"
                v-if="member.id != loadedCourse.leader.id"
              >
                <div class="" style="width: 24px; height: 24px">
                  <img
                    style="width: 24px; height: 24px"
                    class="rounded-circle position-relative w-100"
                    :src="this.$url + member.information.photo_path"
                    alt=""
                  />
                </div>
                <div class="ms-2">
                  {{ member.name }}
                  {{ member.surname }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
