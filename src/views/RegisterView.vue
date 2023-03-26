<script>
import { useVuelidate } from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
import { mapGetters, mapMutations } from "vuex";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "RegisterView",

  data: () => ({
    v$: useVuelidate(),
  }),

  mounted() {
    this.setRegister({
      email: "",
      name: "",
      surname: "",
      password: "",
      password_confirmation: "",
    });

    this.setError({
      message: "",
      code: "",
    });
  },

  computed: {
    ...mapGetters(["register", "error"]),
  },

  methods: {
    ...mapMutations(["setRegister", "setError"]),

    signUp() {
      this.v$.$validate();

      if (!this.v$.$error) {
        this.$store.dispatch("signUp", this.register);
      }
    },
  },

  validations() {
    return {
      register: {
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

        name: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 32 символа",
            maxLength(32)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 2 символов",
            minLength(2)
          ),
        },

        surname: {
          required: helpers.withMessage("Поле не должно быть пустым", required),
          maxLength: helpers.withMessage(
            "Максимальная длина: 32 символа",
            maxLength(32)
          ),
          minLength: helpers.withMessage(
            "Минимальная длина: 2 символов",
            minLength(2)
          ),
        },

        password_confirmation: {
          sameAs: helpers.withMessage(
            "Пароль не совпадает",
            sameAs(this.register.password)
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
      <div class="text-center text-light mb-2 fs-4 mt-4">
        Регистрация в
        <router-link to="/">
          <a class="text-primary">Classdev</a>
        </router-link>
      </div>
      <div class="text-danger">{{ error.message }}</div>
      <form
        class="border text-light border-gray-1 rounded p-3 mt-3"
        style="max-width: 340px; width: 100%"
        @submit.prevent="signUp"
      >
        <div class="mb-2">
          <input-component
            :label="'Адрес электронной почты'"
            type="text"
            name="email"
            v-model="register.email"
            :error="v$.register.email.$errors"
          />
        </div>
        <div class="mb-2">
          <input-component
            :label="'Имя'"
            type="text"
            name="name"
            v-model="register.name"
            :error="v$.register.name.$errors"
          />
        </div>
        <div class="mb-2">
          <input-component
            :label="'Фамилия'"
            type="text"
            name="surname"
            v-model="register.surname"
            :error="v$.register.surname.$errors"
          />
        </div>
        <div class="mb-2">
          <input-component
            :label="'Пароль'"
            type="password"
            name="password"
            v-model="register.password"
            :error="v$.register.password.$errors"
          />
        </div>
        <div class="mb-3">
          <input-component
            :label="'Повтор пароля'"
            type="password"
            name="password_confirmation"
            v-model="register.password_confirmation"
            :error="v$.register.password_confirmation.$errors"
          />
        </div>
        <div class="">
          <button type="submit" class="w-100 btn btn-primary text-light fs-5">
            Создать аккаунт
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
