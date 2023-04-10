<script>
import { mapGetters } from "vuex";
import LinearPreloaderComponent from "@/components/LinearPreloaderComponent.vue";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "CourseView",

  data: () => ({
    isLoaded: false,
  }),

  mounted() {
    this.$store.dispatch("getCourse", this.$route.params.course);
    this.$store.dispatch("getTasks", this.$route.params.course);
  },

  computed: {
    ...mapGetters([
      "loadedCourse",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
      "tasks",
      "dates",
    ]),
  },

  components: {
    LinearPreloaderComponent,
    InputComponent,
  },
};
</script>

<template>
  <div class="pt-4 text-light position-relative">
    <linear-preloader-component
      :load="loadStatusLoadedCourse"
      :load_2="loadStatusLoadedTasks"
    ></linear-preloader-component>

    <div class="">
      <div class="main-px points-1 fs-4" style="max-width: 768px; height: 39px">
        <span v-if="loadStatusLoadedCourse === 'READY'">
          {{ loadedCourse.title }}
        </span>
      </div>
      <div class="mt-4 w-100 main-px border-bottom border-gray-1">
        <div class="d-flex align-items-center mb-2 text-gray-1">
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="this.$route.query.q == 'Task' ? 'active' : 'text-gray-1'"
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Task'"
            >
              Задания
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="
                this.$route.query.q == 'Members' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Members'"
            >
              Участники
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="
                this.$route.query.q == 'Messenger' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Messenger'"
            >
              Мессенджер
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="this.$route.query.q == 'Grade' ? 'active' : 'text-gray-1'"
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Grade'"
            >
              Оценки
            </router-link>
          </div>
          <div class="me-2 px-2 py-1 text">
            <router-link
              :class="
                this.$route.query.q == 'Settings' ? 'active' : 'text-gray-1'
              "
              class="text text-decoration-none"
              :to="'/courses/' + this.$route.params.course + '?q=Settings'"
            >
              Настройки
            </router-link>
          </div>
        </div>
      </div>
      <div class="main-px mt-4">
        <div class="" v-if="this.$route.query.q == 'Task'">
          <div class="d-flex align-items-center justify-content-start">
            <button class="btn btn-primary px-2 py-1">Создать</button>

            <button class="bg-transparent border-0 mx-3">
              <img src="@/assets/funnel.png" alt="" />
            </button>

            <form action="">
              <input-component :modelValue="'Поиск...'"></input-component>
            </form>
          </div>
          <div class="mw-768 mt-4">
            <div
              class=""
              v-if="
                loadStatusLoadedTasks === 'READY' &&
                loadStatusLoadedCourse === 'READY'
              "
            >
              <div
                class="w-100 border rounded border-gray-1 mb-4 p-3 pb-4"
                v-for="date in dates"
                :key="date"
              >
                <div class="text-light fs-18">
                  {{ date }}
                </div>
                <div class="" v-for="task in tasks" :key="task.id">
                  <div
                    class="d-flex align-items-center justify-content-start mt-3"
                    v-if="task.created_at === date"
                  >
                    <router-link
                      class="d-flex w-100 align-items-center justify-content-start text-decoration-none text-light"
                      :to="{
                        name: 'task',
                        params: {
                          course: loadedCourse.id,
                          task: task.id,
                        },
                      }"
                    >
                      <img
                        v-if="task.type.id == 1"
                        src="@/assets/file-earmark-fill.png"
                        alt=""
                      />
                      <img v-else src="@/assets/info-lg.png" alt="" />

                      <div class="ms-2 points-1">
                        {{ task.title }}
                      </div>
                    </router-link>
                  </div>
                </div>
                <!-- <div
                class=""
                v-for="(task, index) in loadedCourse.tasks"
                :key="task.id"
              >
                {{
                  (index != 0 &&
                    this.$moment.getDate(task.created_at) !==
                      this.$moment.getDate(
                        loadedCourse.tasks[index - 1].created_at
                      )) ||
                  index == 0
                    ? this.$moment.getDate(task.created_at)
                    : ""
                }}
              </div> -->
              </div>
            </div>
            <div
              class=""
              v-if="
                loadStatusLoadedTasks === 'EMPTY' &&
                loadStatusLoadedCourse === 'READY'
              "
            >
              <div class="w-100 text-center fs-1 text-gray-1 pt-3">
                <div class="py-3 w-100 border rounded border-gray-1">
                  Нет заданий
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
