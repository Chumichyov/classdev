<script>
import { mapGetters } from "vuex";
import Dropzone from "dropzone";

export default {
  name: "NewUserImageModalComponent",

  data: () => ({
    dropzone: null,
    title: "",
    image: "",
  }),

  mounted() {
    this.dropzone = new Dropzone(this.$refs.dropzone2, {
      url: "some",
      autoProcessQueue: false,
      createImageThumbnails: false,
      maxFiles: 1,
      previewsContainer: "#previews",
      previewTemplate: document.getElementById("previews").innerHTML,
    });
  },

  components: {},

  computed: {
    ...mapGetters(["authUser"]),
  },

  methods: {
    storeImage() {
      if (this.dropzone.files.length > 0) {
        const formData = new FormData();

        const files = this.dropzone.getAcceptedFiles();

        files.forEach((file) => {
          formData.append("files[]", file);
        });

        formData.append("user", this.authUser.id);

        this.$store.dispatch("imageUpdate", formData);

        this.$refs.close.click();

        setTimeout(() => {
          this.dropzone.removeAllFiles();
        }, 500);
      }
    },

    toRef() {
      this.$refs.dropzone2.click();
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="newUserImage"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="newUserImageLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content background-dark-1">
        <div class="modal-header border-0">
          <h5 class="modal-title text-white" id="newUserImageLabel">
            Фотография
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body text-white py-0 d-flex align-items-center flex-column"
        >
          <!-- <div
            class="rounded-circle overflow-hidden"
            style="width: 240px; height: 240px"
          >
            <img
              :src="
                this.$url +
                (authUser.information ? authUser.information.photo_path : '')
              "
              class="w-100 h-100"
              alt=""
            />
          </div> -->
          <div
            class="w-100 py-3 pb-3 border border-primary border-dashed rounded text-light cursor-pointer"
            ref="dropzone2"
          >
            <div
              class="d-flex align-items-center justify-content-start user-select-none flex-fill position-relative px-3"
            >
              <div
                class="position-absolute top-0 bottom-0 start-0 end-0"
                @click.prevent="toRef"
              ></div>
              <div class="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="currentColor"
                  class="bi bi-cloud-upload-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"
                  />
                </svg>
              </div>
              <div class="ms-3">
                <div class="">
                  Перетащите файл сюда или нажмите для загрузки
                </div>
              </div>
            </div>
            <div
              class="dropzone-items align-items-center justify-content-start"
              id="previews"
            >
              <div
                class="dz-preview dz-file-preview well d-flex align-items-center justify-content-start py-2 my-hover px-3"
                id="dz-preview-template"
              >
                <div
                  class="dz-details flex-fill d-flex align-items-center justify-content-start"
                >
                  <div
                    class="dz-filename w-100 points-1"
                    style="max-width: 180px"
                  >
                    <span data-dz-name></span>
                  </div>
                  <div class="dz-size ms-3 flex-shrink-0 text-end">
                    <strong
                      ><span class="fw-normal" data-dz-size></span
                    ></strong>
                  </div>
                </div>
                <a
                  class="dz-remove"
                  href="javascript:undefined;"
                  data-dz-remove=""
                  >Удалить</a
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal-footer border-0 d-flex align-items-center justify-content-end"
        >
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click.prevent="storeImage()"
          >
            Изменить
          </button>
          <button
            ref="close"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
