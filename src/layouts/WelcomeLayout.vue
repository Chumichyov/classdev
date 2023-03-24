<template>
  <header
    class="background-292D31 text-light main-px d-flex flex-wrap align-items-center justify-content-center justify-content-between"
    style="min-height: 60px"
  >
    <a
      href="#"
      class="d-flex align-items-center text-light fs-3 py-2 text-decoration-none"
      >Classdev</a
    >
    <router-link
      to="/login"
      class="d-flex align-items-center text-decoration-none"
    >
      <a href="#" class="btn btn-outline-light ubuntu" style="font-size: 14px">
        Вход
      </a>
    </router-link>
  </header>
  <div class="main-px">
    <router-view></router-view>
  </div>
</template>
