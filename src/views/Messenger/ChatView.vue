<script>
import { mapGetters } from "vuex";

export default {
  name: "ChatView",

  components: {},

  data: () => ({
    content: "",
    mess: "",
    chat: false,
  }),

  computed: {
    ...mapGetters([
      "messenger",
      "messengers",
      "loadStatusLoadedMessengers",
      "loadStatusLoadedMessenger",
      "authUser",
    ]),
  },

  mounted() {
    if (this.loadStatusLoadedMessengers == null) {
      this.$store.dispatch("getMessengers", {
        course: this.$route.params.course,
      });
    }
    if (this.loadStatusLoadedMessenger == null) {
      this.$store
        .dispatch("getMessenger", {
          course: this.$route.params.course,
          messenger: this.$route.params.messenger,
        })
        .then(() => {
          this.maxHeight();
        });
    } else {
      this.maxHeight();
    }
  },

  methods: {
    maxHeight() {
      let chat = this.$refs["chat"];
      if (chat) chat.style.maxHeight = chat.clientHeight + 5 + "px";

      this.chat = true;
      this.toDown();
    },

    toDown() {
      let chat = this.$refs["chat"];
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    },

    resize() {
      let element = this.$refs["textarea"];
      let height = element.style.height;
      const scrollHeight = element.scrollHeight;

      if (scrollHeight > height.slice(0, -2)) {
        element.style.height = element.scrollHeight + 2 + "px";
      }
    },

    storeMessage() {
      this.$store
        .dispatch("storeMessage", {
          course: this.$route.params.course,
          messenger: this.$route.params.messenger,
          content: this.content,
        })
        .then(() => {
          this.content = "";
          this.mess = this.messenger;

          this.toDown();
        });
    },

    toMessenger() {
      this.$store
        .dispatch("getMessengers", {
          course: this.$route.params.course,
        })
        .then(() => {
          this.$router.push({
            name: "course.messenger",
            params: {
              course: this.$route.params.course,
            },
          });
        });
    },
  },
};
</script>

<template>
  <div class="pt-4 mw-900 text-light position-relative h-100 pb-md-3">
    <div class="main-px main-px-767 h-100">
      <div
        class="border-top border-md-bottom border-md-start border-md-end border-gray-2 rounded-md d-flex flex-column h-100 overflow-hidden"
      >
        <div
          class="w-100 d-flex align-items-center m-0 py-2 border-bottom border-gray-2 px-3"
        >
          <div
            class="text-gray-1 d-flex align-items-center justify-content-start w-auto w-md-100 me-2 me-md-0"
            style="max-width: 75px"
          >
            <div
              @click.prevent="toMessenger()"
              class="d-flex align-items-center justify-content-start cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
              <div class="ms-2 d-none d-md-block">Назад</div>
            </div>
          </div>
          <div
            class="d-flex flex-fill align-items-center justify-content-center text-center"
            v-if="messenger.student && messenger.teacher"
          >
            {{
              messenger.student.id == authUser.id
                ? messenger.teacher.name + " " + messenger.teacher.surname
                : messenger.student.name + " " + messenger.student.surname
            }}
          </div>
          <div
            class="d-flex justify-content-end align-items-center w-auto w-md-100 ms-2 ms-md-0"
            style="max-width: 75px"
          >
            <div
              class="overflow-hidden rounded-circle"
              style="width: 32px; height: 32px"
            >
              <img
                v-if="messenger.student && messenger.teacher"
                class="w-100 h-100"
                :src="
                  this.$url +
                  (messenger.student.id == authUser.id
                    ? messenger.teacher.information.photo_path
                    : messenger.student.information.photo_path)
                "
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          class="px-3 py-2 flex-fill overflow-scroll"
          style="margin-top: 6px"
          id="chat"
          ref="chat"
        >
          <div class="d-flex flex-column justify-content-end" v-if="chat">
            <div
              class=""
              v-for="(message, index) in messenger.messages"
              :key="message.id"
              :class="
                messenger.messages[index + 1] &&
                ((index != messenger.messages.length - 1 &&
                  messenger.messages[index + 1].sender != message.sender) ||
                  !messenger.messages[index + 1] ||
                  (messenger.messages[index + 1] &&
                    this.$moment.getDate(message.created_at) !=
                      this.$moment.getDate(
                        messenger.messages[index + 1].created_at
                      )))
                  ? 'mb-4'
                  : 'mb-2'
              "
            >
              <div
                class="text-center pb-2 text-gray-1"
                v-if="
                  (messenger.messages[index - 1] &&
                    this.$moment.getDate(
                      messenger.messages[index].created_at
                    ) !=
                      this.$moment.getDate(
                        messenger.messages[index - 1].created_at
                      )) ||
                  !messenger.messages[index - 1]
                "
              >
                {{ this.$moment.getDate(messenger.messages[index].created_at) }}
              </div>
              <div class="d-flex align-items-start">
                <div
                  class="overflow-hidden rounded-circle flex-shrink-0 me-2"
                  style="width: 28px; height: 28px"
                >
                  <img
                    v-if="
                      (messenger.messages[index - 1] &&
                        messenger.messages[index - 1].sender !=
                          message.sender) ||
                      !messenger.messages[index - 1] ||
                      (messenger.messages[index - 1] &&
                        this.$moment.getDate(message.created_at) !=
                          this.$moment.getDate(
                            messenger.messages[index - 1].created_at
                          ))
                    "
                    class="w-100 h-100"
                    :src="
                      this.$url +
                      (messenger.student.id == message.sender
                        ? messenger.student.information.photo_path
                        : messenger.teacher.information.photo_path)
                    "
                    alt=""
                  />
                </div>
                <div
                  :class="message.sender == authUser.id ? 'order-1' : 'order-2'"
                  class="background-dark-2 rounded px-2 py-1"
                  style="max-width: 722px"
                >
                  <div class="d-flex align-items-center">
                    <div
                      v-if="
                        (messenger.student &&
                          messenger.teacher &&
                          messenger.messages[index - 1] &&
                          messenger.messages[index - 1].sender !=
                            message.sender) ||
                        !messenger.messages[index - 1] ||
                        (messenger.messages[index - 1] &&
                          this.$moment.getDate(message.created_at) !=
                            this.$moment.getDate(
                              messenger.messages[index - 1].created_at
                            ))
                      "
                      class="text-primary flex-fill"
                    >
                      {{
                        messenger.student.id == message.sender
                          ? messenger.student.name +
                            " " +
                            messenger.student.surname
                          : messenger.teacher.name +
                            " " +
                            messenger.teacher.surname
                      }}
                    </div>
                    <div class="flex-fill" v-else></div>
                    <div
                      class="text-gray-1 fs-14 ms-2"
                      v-if="
                        !(
                          messenger.student &&
                          messenger.teacher &&
                          messenger.messages[index - 1] &&
                          messenger.messages[index - 1].sender != message.sender
                        ) || messenger.messages[index - 1]
                      "
                    >
                      {{ this.$moment.getTime(message.created_at) }}
                    </div>
                  </div>
                  <div
                    class="flex-fill test-start"
                    style="word-break: break-all"
                  >
                    {{ message.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="background-dark-2 d-flex py-3">
          <textarea
            v-model="content"
            @input="resize()"
            @focus="resize()"
            ref="textarea"
            :style="content == '' ? 'margin-right: 50px' : ''"
            style="height: 38px; max-height: 136px"
            class="form-control border rounded border-gray-2 flex-fill background-dark-1 resize-none text-light resize-none ms-3"
            name=""
            id=""
            placeholder="Напишите сообщение..."
          ></textarea>
          <div
            class="d-flex align-items-center justify-content-end px-3 cursor-pointer"
            style="height: 38px"
            v-if="content != ''"
            @click.prevent="storeMessage()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
