<script>
export default {
  name: "ModalComponent",

  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="" v-if="notification">
    <!-- Новое задание -->
    <div
      v-if="notification.type.title == 'Новое задание'"
      class="modal"
      :id="'notification-' + notification.id"
      data-bs-keyboard="false"
      data-bs-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content background-dark-1">
          <div class="modal-header border-0">
            <h5 class="modal-title text-light">
              {{ notification.type.title }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body pt-0 border-0 text-light fw-normal">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item" data-bs-dismiss="modal">
                  <router-link
                    :to="'/courses/' + notification.course.id"
                    class="text-decoration-none"
                    >Курс</router-link
                  >
                </li>
                <li class="breadcrumb-item points-1" data-bs-dismiss="modal">
                  <router-link
                    :to="'/courses/' + notification.course.id"
                    class="text-decoration-none"
                    >Задание</router-link
                  >
                </li>
              </ol>
            </nav>
            <div class="mb-2">
              {{ notification.task.title }}
            </div>
            <div class="fs-14 points-6">
              {{ notification.task.description }}
            </div>
          </div>
          <div
            class="modal-footer border-0 d-flex align-items-center justify-content-between"
          >
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
            <button type="button" class="btn btn-primary">Открыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
