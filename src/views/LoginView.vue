<script>
import { useVuelidate } from "@vuelidate/core";
import { mapGetters, mapMutations } from "vuex";
import { helpers, required, email, minLength } from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "LoginView",

  data: () => ({
    v$: useVuelidate(),
    auth: {
      email: "",
      password: "",
    },
  }),

  mounted() {
    this.setError({
      message: "",
      code: "",
    });
  },

  computed: {
    ...mapGetters(["error", "courses"]),
  },

  methods: {
    ...mapMutations(["setAuth", "setError"]),

    signIn() {
      this.v$.$validate();

      if (!this.v$.$error) {
        this.$store.dispatch("signIn", this.auth);
      }
    },
  },

  validations() {
    return {
      auth: {
        email: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          email: helpers.withMessage("Введите почту", email),
        },
        password: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          minLength: helpers.withMessage(
            "Минимальная длина: 8 символов",
            minLength(8)
          ),
        },
      },
    };
  },

  components: {
    InputComponent,
  },
};
</script>

<template>
  <div class="position-absolute top-0 bottom-0 start-0 end-0 main-px">
    <div
      class="d-flex flex-column h-100 align-items-center justify-content-center"
    >
      <div class="text-center text-light mb-2 fs-4">
        Войдите в
        <router-link to="/">
          <a class="text-primary">Classdev</a>
        </router-link>
      </div>
      <div class="text-danger">{{ error.message }}</div>
      <form
        class="border text-light border-gray-1 mb-4 rounded p-3 mt-3"
        style="max-width: 340px; width: 100%"
        @submit.prevent="signIn"
      >
        <div class="mb-2">
          <input-component
            :label="'Адрес электронной почты'"
            type="text"
            name="email"
            v-model="auth.email"
            :error="v$.auth.email.$errors"
          />
        </div>
        <div class="mb-3">
          <input-component
            :label="'Пароль'"
            type="password"
            name="password"
            v-model="auth.password"
            :error="v$.auth.password.$errors"
          />
        </div>
        <div class="">
          <button type="submit" class="w-100 btn btn-primary text-light fs-5">
            Войти
          </button>
        </div>
      </form>
      <div
        class="border text-light border-gray-1 rounded p-3 fs-5 text-center"
        style="max-width: 340px; width: 100%"
      >
        <span class="fw-normal">Нет аккаунта?</span>
        <router-link to="/register" class="text-decoration-none">
          <a href="#" class="text-primary text-decoration-none">
            Создать аккаунт
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>
