<script>
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
// import Popper from "vue3-popper";

export default {
  name: "CourseSettingsView",

  data: () => ({
    v$: useVuelidate(),

    course: {
      title: "",
      description: "",
    },

    code: "",
    link: "",
  }),

  components: {
    // Popper,
  },

  mounted() {
    if (!this.isTeacher) {
      this.$router.push({
        name: "error",
      });
    }

    this.get();
  },

  computed: {
    ...mapGetters(["loadedCourse", "loadedCourseInformation", "isTeacher"]),
  },

  validations() {
    return {
      course: {
        title: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 36 символа",
            maxLength(36)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 4 символов",
            minLength(4)
          ),
        },

        description: {
          minLength: helpers.withMessage(
            "Минимальная длина: 2 символов",
            minLength(2)
          ),
        },
      },
    };
  },

  methods: {
    get() {
      this.course.title = this.loadedCourse.title;
      this.course.description = this.loadedCourse.description;
      this.code = this.loadedCourseInformation.code;
      this.link =
        this.$url + "api/connection/" + this.loadedCourseInformation.link;

      this.resize();
    },

    resize() {
      let element = this.$refs["textarea"];
      let height = element.style.height;
      const scrollHeight = element.scrollHeight;

      if (scrollHeight > height.slice(0, -2)) {
        element.style.height = element.scrollHeight + 2 + "px";
      }
    },

    codeUpdate() {
      this.$store
        .dispatch("updateCode", {
          course: this.$route.params.course,
        })
        .then(() => {
          this.code = this.loadedCourseInformation.code;
        });
    },

    destroyCourse() {
      this.$store.dispatch("destroyCourse", {
        course: this.$route.params.course,
      });
    },

    expelUser(user) {
      this.$store.dispatch("expelUser", {
        course: this.$route.params.course,
        user: user,
      });
    },

    linkUpdate() {
      this.$store
        .dispatch("updateLink", {
          course: this.$route.params.course,
        })
        .then(() => {
          this.link =
            this.$url + "api/connection/" + this.loadedCourseInformation.link;
        });
    },

    courseUpdate() {
      this.v$.$validate("course");

      if (!this.v$.$error) {
        this.$store.dispatch("updateCourse", {
          course: this.$route.params.course,
          title: this.course.title,
          description: this.course.description,
        });
      }
    },
  },
};
</script>

<template>
  <div class="pt-4 mw-900 text-light position-relative">
    <div class="main-px">
      <div class="w-100 pb-3">
        <form action="" class="" @submit.prevent="courseUpdate">
          <div class="d-flex align-items-center">
            <div class="fs-5 flex-fill py-2 points-1">Информация о курсе</div>
            <button type="submit" class="btn btn-primary px-2 py-1">
              Изменить
            </button>
          </div>
          <label for="title" class="form-label pt-2 fw-normal">Название</label>
          <input
            class="form-control border-gray-1 bg-transparent text-light"
            style="height: 32px"
            type="text"
            name="title"
            v-model="course.title"
          />
          <div class="" style="min-height: 21px" v-if="v$.course.title.$error">
            <div class="form-error">
              <div
                class="form-error__message text-danger fw-normal"
                style="font-size: 14px"
              >
                {{ v$.course.title.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center mb-2 mt-3">
            <div class="text-light">Описание</div>
          </div>
          <textarea
            class="p-2 pb-3 text-light w-100 background-dark-1 rounded form-control border-gray-1"
            v-model="course.description"
            type="text"
            name="name"
            @input="resize()"
            ref="textarea"
            style="min-height: 99px"
          ></textarea>
        </form>
        <div class="fs-5 py-2 mt-3">Подключение</div>
        <form action="" class="py-2" @submit.prevent="codeUpdate">
          <label for="title" class="form-label fw-normal">
            <span class="">Код</span>
          </label>
          <div class="d-flex align-items-center justify-content-between">
            <div class="position-relative flex-fill">
              <input
                disabled
                class="form-control border-gray-1 bg-transparent text-primary"
                style="height: 32px; padding-right: 36px"
                type="text"
                name="code"
                v-model="code"
              />
              <button
                type="button"
                class="position-absolute end-0 top-0 bottom-0 btn btn-link d-flex align-items-center p-1 pe-2"
                v-clipboard="code"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-clipboard"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                  />
                  <path
                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                  />
                </svg>
              </button>
            </div>

            <button type="submit" class="btn btn-primary py-1 px-2 ms-2">
              Изменить
            </button>
          </div>
          <div class="py-2 text-gray-1 fs-14">
            С помощью кода пользователи могут подключаться у курсу. Вы можете
            отслеживать подключенных участников тут. При генерации нового кода,
            создается случайный шестизначный код, а предыдущий перестает
            действовать.
          </div>
        </form>
        <form action="" class="pt-2" @submit.prevent="linkUpdate">
          <label for="title" class="form-label fw-normal">
            <span class="">Ссылка</span>
          </label>
          <div class="d-flex align-items-center justify-content-between">
            <div class="position-relative flex-fill">
              <input
                disabled
                class="form-control border-gray-1 bg-transparent text-primary"
                style="height: 32px; padding-right: 36px"
                type="text"
                name="link"
                v-model="link"
              />
              <button
                type="button"
                class="position-absolute end-0 top-0 bottom-0 btn btn-link d-flex align-items-center p-1 pe-2"
                v-clipboard="link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-clipboard"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                  />
                  <path
                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                  />
                </svg>
              </button>
            </div>

            <button type="submit" class="btn btn-primary py-1 px-2 ms-2">
              Изменить
            </button>
          </div>
          <div class="pt-2 text-gray-1 fs-14">
            С помощью ссылки пользователи смогут подключаться к курсу. При
            генерации новой ссылки предыдущая перестает действовать.
          </div>
        </form>
        <div class="fs-5 mt-3 py-2">Участники</div>
        <div class="border border-gray-2 rounded">
          <div
            class="py-2"
            v-if="loadedCourse.members && loadedCourse.members[1] != undefined"
          >
            <div
              class=""
              v-for="member in loadedCourse.members"
              :key="member.id"
            >
              <div
                class="px-3 my-hover py-2 d-flex align-items-center"
                v-if="member.id != loadedCourse.leader.id"
              >
                <img
                  style="width: 24px; height: 24px"
                  class="rounded-circle position-relative"
                  :src="this.$url + member.information.photo_path"
                  alt=""
                />
                <div class="ms-2 flex-fill cursor-pointer">
                  {{ member.name }} {{ member.surname }}
                </div>
                <div
                  class="p-1 text-danger cursor-pointer d-flex align-items-center justify-content-center"
                  style="width: 24px; height: 24px"
                  @click.prevent="expelUser(member.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="py-2 text-center" v-else>Участники отсутствуют</div>
        </div>
        <div class="fs-5 mt-3 py-2">Опасная зона</div>
        <div class="py-2 px-3 border rounded border-danger">
          <div class="d-flex align-items-center">
            <div class="flex-fill">
              <div class="">Удаление курса</div>
              <div class="fs-14 text-gray-1">
                При удалении курса вся информация, связанная с курсом будет
                удалена НАВСЕГДА.
              </div>
            </div>
            <button
              class="btn btn-danger py-1 px-2 flex-shrink-0"
              @click.prevent="destroyCourse"
            >
              Удалить курс
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
