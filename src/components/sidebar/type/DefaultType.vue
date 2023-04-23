<script>
import InputComponent from "../../InputComponent.vue";
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

  components: {
    InputComponent,
  },
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
      <form action="" class="mt-3">
        <input-component
          v-on:input="newCourses"
          type="text"
          name="search"
          v-model="search"
        />
      </form>
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
