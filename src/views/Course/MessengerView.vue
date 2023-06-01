<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CourseMessengerView",

  data: () => ({
    search: "",
  }),

  mounted() {
    if (this.loadStatusLoadedMessengers == null) {
      this.$store.dispatch("getMessengers", {
        course: this.$route.params.course,
      });
    }
  },

  computed: {
    ...mapGetters(["messengers", "loadStatusLoadedMessengers", "isTeacher"]),
  },

  methods: {
    ...mapMutations(["setMessenger"]),

    searchMessengers() {
      this.$store.dispatch("searchMessengers", {
        course: this.$route.params.course,
        search: this.search,
      });
    },

    toChat(messenger) {
      this.setMessenger("");
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
  <div class="pt-4 mw-900 text-light position-relative">
    <div class="main-px">
      <!-- Teacher -->
      <div class="border border-gray-2 rounded-md" v-if="isTeacher">
        <div
          class="w-100 d-flex align-items-center mb-3 border-bottom border-gray-2 py-2"
        >
          <input
            type="text"
            class="form-control text-light bg-transparent border-0 flex-fill"
            name="search"
            v-model="search"
            placeholder="Поиск..."
            style="height: 34px"
          />
          <button
            @click.prevent="searchMessengers()"
            style="height: 34px"
            class="ms-2 text-primary d-flex align-items-center justify-content-center px-2 py-1 btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
        <div
          class="px-3 py-2 my-hover cursor-pointer"
          v-for="messenger in messengers"
          :key="messenger.id"
        >
          <div
            class="d-flex align-items-start"
            v-if="messenger.student"
            @click.prevent="toChat(messenger.id)"
          >
            <div
              class="rounded-circle overflow-hidden flex-shrink-0"
              style="width: 48px; height: 48px"
            >
              <img
                :src="this.$url + messenger.student.information.photo_path"
                alt=""
                class="w-100 h-auto"
              />
            </div>
            <div class="ms-3 d-flex flex-column justify-content-between">
              <div class="fs-14">
                {{ messenger.student.name }} {{ messenger.student.surname }}
              </div>
              <div
                class="d-flex align-items-center mt-1"
                v-if="messenger.last_message"
              >
                <div
                  class="overflow-hidden rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style="width: 23px; height: 23px"
                >
                  <img
                    :src="
                      this.$url +
                      (messenger.student.id == messenger.last_message.sender
                        ? messenger.student.information.photo_path
                        : messenger.teacher.information.photo_path)
                    "
                    alt=""
                    class="w-100 h-100"
                  />
                </div>
                <div class="ms-2 text-gray-1 fs-14 points-1">
                  {{ messenger.last_message.content }}
                </div>
              </div>
              <div class="fs-14 text-gray-1" v-else>Чат пустой</div>
            </div>
          </div>
        </div>
        <div class="text-center pb-3 fs-5 text-gray-1" v-if="messengers == ''">
          Чаты отсутствуют
        </div>
      </div>

      <!-- Student -->
      <div class="border border-gray-2 rounded" v-else>
        <div
          class="w-100 d-flex align-items-center mb-3 border-bottom border-gray-2 py-2"
        >
          <input
            type="text"
            class="form-control text-light bg-transparent border-0 flex-fill"
            name="search"
            v-model="search"
            placeholder="Поиск..."
            style="height: 34px"
          />
          <button
            @click.prevent="searchMessengers()"
            style="height: 34px"
            class="ms-2 text-primary d-flex align-items-center justify-content-center px-2 py-1 btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
        <div
          class="px-3 py-2 my-hover cursor-pointer"
          v-for="messenger in messengers"
          :key="messenger.id"
        >
          <div
            class="d-flex align-items-start"
            v-if="messenger.teacher"
            @click.prevent="toChat(messenger.id)"
          >
            <div
              class="rounded-circle overflow-hidden flex-shrink-0"
              style="width: 48px; height: 48px"
            >
              <img
                :src="this.$url + messenger.teacher.information.photo_path"
                alt=""
                class="w-100 h-auto"
              />
            </div>
            <div class="ms-3 d-flex flex-column justify-content-between">
              <div class="fs-14">
                {{ messenger.teacher.name }} {{ messenger.teacher.surname }}
              </div>
              <div
                class="d-flex align-items-center mt-1"
                v-if="messenger.last_message"
              >
                <div
                  class="overflow-hidden rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style="width: 23px; height: 23px"
                >
                  <img
                    :src="
                      this.$url +
                      (messenger.student.id == messenger.last_message.sender
                        ? messenger.student.information.photo_path
                        : messenger.teacher.information.photo_path)
                    "
                    alt=""
                    class="w-100 h-100"
                  />
                </div>
                <div class="ms-2 text-gray-1 fs-14 points-1">
                  {{ messenger.last_message.content }}
                </div>
              </div>
              <div class="fs-14 text-gray-1" v-else>Чат пустой</div>
            </div>
          </div>
        </div>
        <div class="text-center pb-3 fs-5 text-gray-1" v-if="messengers == ''">
          Чаты отсутствуют
        </div>
      </div>
    </div>
  </div>
</template>
