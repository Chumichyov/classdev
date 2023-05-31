<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "DefaultType",

  data: () => ({
    search: "",
  }),

  computed: {
    ...mapGetters([
      "courses",
      "loadStatusLoadedCourse",
      "loadStatusLoadedTasks",
    ]),
  },

  methods: {
    toCourse(course) {
      this.$store.dispatch("getCourse", course);
      this.$store
        .dispatch("getTasks", {
          course: course,
          type: "Date",
          search: "",
        })
        .then(() => {
          if (
            this.loadStatusLoadedCourse == "READY" &&
            (this.loadStatusLoadedTasks == "READY" ||
              this.loadStatusLoadedTasks == "EMPTY")
          ) {
            this.$router.push({
              name: "course.tasks",
              params: {
                course: course,
              },
            });
          }
        });
    },

    ...mapMutations(["setCoursesSearch"]),

    newCourses() {
      let route = "";

      if (this.search !== "") {
        route = `/main?search=${this.search}`;
      } else {
        route = `/main`;
      }

      this.$router.push(route);

      this.setCoursesSearch(this.search);

      this.$store.dispatch("indexCoursesSearch");
    },
  },

  components: {},
};
</script>

<template>
  <div class="h-100-992">
    <div class="mb-4">
      <div class="d-flex align-items-center justify-content-between text-light">
        <div class="">Курсы</div>
        <button
          type="button"
          class="btn btn-primary px-2 py-1"
          data-bs-toggle="modal"
          data-bs-target="#newCourse"
        >
          Создать
        </button>
      </div>
      <div class="mt-3 d-flex align-items-center">
        <input
          class="form-control bg-transparent border-gray-2 text-light px-2 py-1 flex-fill"
          type="text"
          name="search"
          v-model="search"
          placeholder="Поиск..."
        />
        <button
          @click.prevent="newCourses()"
          style="height: 34px"
          class="ms-2 text-light d-flex align-items-center justify-content-center px-2 py-1 btn btn-primary"
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
    </div>
    <div class="" v-for="(course, index) in courses" :key="course.id">
      <div
        class="text-decoration-none cursor-pointer"
        @click.prevent="toCourse(course.id)"
      >
        <div
          class="d-flex align-items-center justify-content-start"
          :class="index > 0 ? 'mt-2' : ''"
        >
          <img
            class="rounded-circle position-relative w-100"
            style="max-width: 21px; max-height: 21px"
            :src="this.$url + course.leader.information.photo_path"
            alt=""
          />
          <span class="text-light fs-14 points-1 ms-2">
            {{ course.title }}
          </span>
        </div>
      </div>
    </div>
    <div class="text-gray-1 w-100 text-center" v-if="courses == ''">
      Курсов не найдено
    </div>
  </div>
</template>
