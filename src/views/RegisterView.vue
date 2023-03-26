<template>
  111
  <!-- <div class="position-absolute top-0 bottom-0 start-0 end-0 main-px">
    <div
      class="d-flex flex-column h-100 align-items-center justify-content-center"
    >
      <div class="text-center text-light mb-4 fs-4 mt-4">
        Регистрация в
        <router-link to="/">
          <a class="text-primary">Classdev</a>
        </router-link>
      </div>
      <form
        class="border text-light border-gray-1 rounded p-3"
        style="max-width: 340px; width: 100%"
        @submit.prevent="submitHandler"
      >
        <div class="mb-2">
          <input-component
            :label="'Адрес электронной почты'"
            type="text"
            name="email"
            v-model="email"
            :error="v$.email.$errors"
          />
        </div>
        <div class="mb-2">
          <input-component
            :label="'Имя'"
            type="text"
            name="name"
            v-model="name"
            :error="v$.name.$errors"
          />
        </div>
        <div class="mb-2">
          <input-component
            :label="'Фамилия'"
            type="text"
            name="surname"
            v-model="surname"
            :error="v$.surname.$errors"
          />
        </div>
        <div class="mb-2">
          <input-component
            :label="'Пароль'"
            type="password"
            name="password"
            v-model="password"
            :error="v$.password.$errors"
          />
        </div>
        <div class="mb-3">
          <input-component
            :label="'Повтор пароля'"
            type="password"
            name="password_confirmation"
            v-model="password_confirmation"
            :error="v$.password_confirmation.$errors"
          />
        </div>
        <div class="">
          <button type="submit" class="w-100 btn btn-primary text-light fs-5">
            Создать аккаунт
          </button>
        </div>
      </form>
    </div>
  </div> -->
</template>

<!-- <script>
import { useVuelidate } from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "RegisterView",

  data() {
    return {
      v$: useVuelidate(),
      email: "",
      name: "",
      surname: "",
      password: "",
      password_confirmation: "",
    };
  },

  validations() {
    return {
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
          sameAs(this.password)
        ),
      },
    };
  },

  methods: {
    submitHandler() {
      this.v$.$validate();
    },
  },

  computed: {},

  components: {
    InputComponent,
  },
};
</script> -->
