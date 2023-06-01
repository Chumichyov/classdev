<script>
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import NewUserImageModalComponent from "@/components/modal/NewUserImageModalComponent.vue";
import {
  helpers,
  required,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";

export default {
  name: "ProfileView",

  components: {
    NewUserImageModalComponent,
  },

  data: () => ({
    v$: useVuelidate(),

    type: "password",
    password: "",
    password_confirmation: "",
    bio: "",
  }),

  mounted() {
    this.authUser.information && this.authUser.information.bio
      ? (this.bio = this.authUser.information.bio)
      : "";
  },

  validations() {
    return {
      password: {
        required: helpers.withMessage("Поле не должно быть пустым", required),
        maxLength: helpers.withMessage(
          "Максимальная длина: 24 символа",
          maxLength(24)
        ),
        minLength: helpers.withMessage(
          "Минимальная длина: 8 символов",
          minLength(8)
        ),
      },

      password_confirmation: {
        required: helpers.withMessage("Поле не должно быть пустым", required),
        maxLength: helpers.withMessage(
          "Максимальная длина: 24 символа",
          maxLength(24)
        ),
        minLength: helpers.withMessage(
          "Минимальная длина: 8 символов",
          minLength(8)
        ),
        sameAs: helpers.withMessage(
          "Пароли не совпадают",
          sameAs(this.password)
        ),
      },
    };
  },

  computed: {
    ...mapGetters(["authUser"]),
  },

  methods: {
    changeType() {
      this.type == "password" ? (this.type = "text") : (this.type = "password");
    },

    resize() {
      let element = this.$refs["textarea"];
      let height = element.style.height;
      const scrollHeight = element.scrollHeight;

      if (scrollHeight > height.slice(0, -2)) {
        element.style.height = element.scrollHeight + 2 + "px";
      }
    },

    changeBIO() {
      this.v$.$reset();
      this.$store
        .dispatch("userUpdate", {
          user: this.authUser.id,
          name: this.authUser.name,
          surname: this.authUser.surname,
          bio: this.bio,
        })
        .then(() => {
          this.authUser.information && this.authUser.information.bio
            ? (this.bio = this.authUser.information.bio)
            : "";
        });
    },

    changePassword() {
      this.v$.$validate();

      if (!this.v$.$error) {
        this.$store
          .dispatch("userUpdate", {
            user: this.authUser.id,
            password: this.password,
            password_confirmation: this.password_confirmation,
          })
          .then(() => {
            this.password = "";
            this.password_confirmation = "";
            this.v$.$reset();
          });
      }
    },
  },
};
</script>

<template>
  <div class="mw-900 main-px">
    <div
      class="text-light mt-4 mt-md-5 d-flex flex-column flex-md-row align-items-center align-items-md-start"
    >
      <new-user-image-modal-component></new-user-image-modal-component>

      <div class="d-flex d-md-block align-items-center">
        <div
          class="rounded-circle overflow-hidden cursor-pointer"
          v-if="authUser.information"
          style="width: 240px; height: 240px"
          data-bs-toggle="modal"
          data-bs-target="#newUserImage"
        >
          <img
            class="w-100 h-auto"
            :src="this.$url + authUser.information.photo_path"
            alt=""
          />
        </div>
      </div>
      <div class="mt-4 mt-md-0 ms-0 ms-md-3 flex-fill w-100">
        <input
          type="text"
          class="w-100 form-control rounded bg-transparent text-light border-gray-2"
          placeholder="Имя"
          v-model="authUser.name"
        />
        <input
          type="text"
          class="w-100 form-control rounded bg-transparent text-light border-gray-2 mt-3"
          placeholder="Имя"
          v-model="authUser.surname"
        />
        <textarea
          ref="textarea"
          @input="resize()"
          @focus="resize()"
          name=""
          style="max-height: 138px"
          class="form-control w-100 rounded text-light border-gray-2 mt-3 bg-transparent py-2"
          v-model="bio"
          placeholder="Биография"
        ></textarea>
        <div class="w-100 d-flex align-items-center mt-3">
          <div class="flex-fill me-3 text-gray-1 user-select-none">
            Данная информация будет видна всем пользователям.
          </div>
          <div class="h-100 d-flex align-items-start">
            <button class="btn btn-primary me-2" @click.prevent="changeBIO">
              Изменить
            </button>
          </div>
        </div>
        <input
          type="text"
          class="mt-4 form-control rounded border-gray-2 text-gray-1 bg-transparent"
          disabled
          v-model="authUser.email"
        />
        <div class="mt-4 w-100 fs-5">Опасная зона</div>
        <div class="mt-2 border border-danger rounded px-2 py-2">
          <div class="d-flex align-items-center">
            <input
              :type="type"
              class="form-control w-100 rounded border-0 bg-transparent text-light flex-fill me-2"
              placeholder="Пароль"
              v-model="password"
            />
            <div
              class="text-primary"
              v-if="type == 'password'"
              @click.prevent="changeType()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-eye-slash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                />
                <path
                  d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                />
              </svg>
            </div>
            <div class="text-primary" v-else @click.prevent="changeType()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path
                  d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                />
              </svg>
            </div>
          </div>
          <div
            class="text-danger"
            v-if="v$.password.$errors && v$.password.$errors[0]"
          >
            {{ v$.password.$errors[0].$message }}
          </div>
          <div class="d-flex align-items-center">
            <input
              :type="type"
              class="form-control w-100 rounded border-0 bg-transparent text-light mt-2 flex-fill me-2"
              placeholder="Повторите пароль"
              v-model="password_confirmation"
            />
            <div
              class="text-primary"
              v-if="type == 'password'"
              @click.prevent="changeType()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-eye-slash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                />
                <path
                  d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                />
              </svg>
            </div>
            <div class="text-primary" v-else @click.prevent="changeType()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path
                  d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                />
              </svg>
            </div>
          </div>
          <div
            class="text-danger"
            v-if="
              v$.password_confirmation.$errors &&
              v$.password_confirmation.$errors[0]
            "
          >
            {{ v$.password_confirmation.$errors[0].$message }}
          </div>
          <div class="w-100 text-end mt-2 d-flex align-items-center">
            <div class="flex-fill me-3 text-gray-1">
              Будьте внимательны при смене пароля!
            </div>
            <button class="btn btn-danger" @click.prevent="changePassword()">
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
