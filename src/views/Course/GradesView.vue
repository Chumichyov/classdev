<script>
import { mapGetters } from "vuex";

export default {
  name: "CourseGradesView",

  mounted() {
    if (!this.isTeacher) {
      this.$router.push({
        name: "error",
      });
    }
  },

  computed: {
    ...mapGetters(["isTeacher", "tasks", "loadedCourse", "onlyTasks"]),
  },

  methods: {
    toDecision(task, decision) {
      if (!this.loadedTask || this.loadedTask.id != task) {
        this.$store.dispatch("getTask", {
          course: this.$route.params.course,
          task: task,
        });
      }

      this.$store.dispatch("getAuthDecision", {
        course: this.$route.params.course,
        task: task,
      });

      this.$store.dispatch("getMainFiles", {
        course: this.$route.params.course,
        task: task,
      });

      this.$store
        .dispatch("showDecision", {
          course: this.$route.params.course,
          task: task,
          decision: decision,
        })
        .then(() => {
          this.$router.push({
            name: "decision",
            params: {
              course: this.$route.params.course,
              task: task,
              decision: decision,
            },
          });
        });
    },

    toTask(task, folder = null) {
      if (!this.loadedTask || this.loadedTask.id != task) {
        this.$store.dispatch("getTask", {
          course: this.$route.params.course,
          task: task,
        });
      }

      this.$store.dispatch("getAuthDecision", {
        course: this.$route.params.course,
        task: task,
      });

      this.$store
        .dispatch("getMainFiles", {
          course: this.$route.params.course,
          task: task,
        })
        .then(() => {
          this.$router.push({
            name: "task",
            params: {
              course: this.loadedCourse.id,
              task: task,
            },
          });
        });

      if (folder != null) {
        this.$store
          .dispatch("getTaskFiles", {
            course: this.$route.params.course,
            task: task,
            folder: folder,
          })
          .then(() => {
            this.$router.push({
              name: "task",
              params: {
                course: this.loadedCourse.id,
                task: task,
              },
            });
          });
      }
    },
  },
};
</script>

<template>
  <div class="pt-4 mw-1200 text-light position-relative">
    <div class="main-px">
      <div class="px-3 py-2 border border-gray-2 rounded fs-5 mb-3">Оценки</div>
      <div
        class="mw-100 overflow-scroll d-flex border border-gray-2 background-dark-2 rounded"
      >
        <table class="table mb-0 text-light">
          <thead>
            <tr class="border-0">
              <td
                class="border-gray-2"
                style="min-width: 130px; width: 200px"
              ></td>
              <td
                @click.prevent="toTask(task.id)"
                v-for="task in onlyTasks"
                :key="task.id"
                style="
                  word-wrap: break-word;
                  max-height: 220px;
                  min-width: 90px;
                "
                class="text-center border-gray-2 border-start text-primary cursor-pointer"
              >
                {{ task.title }}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-gray-2 background-dark-2 border-0"
              v-for="(member, index) in loadedCourse.members"
              :key="member.id"
            >
              <td class="border-0" v-if="index != 0">
                {{ member.name }} {{ member.surname }}
              </td>
              <td
                class="border-0 text-center border-start border-gray-2"
                @click.prevent="
                  grade.completed_id != 1
                    ? toDecision(grade.task_id, grade.id)
                    : ''
                "
                :class="{
                  'text-success': grade.grade >= 4,
                  'text-warning': grade.grade == 3,
                  'text-danger': grade.grade < 3 || null,
                  'cursor-pointer': grade.completed_id != 1,
                }"
                v-for="grade in loadedCourse.members[index].grades"
                :key="grade.id"
              >
                {{ grade.grade == null ? "-" : grade.grade }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
