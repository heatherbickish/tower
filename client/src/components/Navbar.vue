<script setup>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})



</script>

<template>
  <nav class="navbar navbar-expand-sm bg-page px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="fs-2 text-primary">
        <b><i class="mdi mdi-radio-tower"></i></b>
        <span class="ms-2">Tower</span>
      </div>
    </router-link>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>

        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div>
      </div>
      <Login />
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}



.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 45px;
  }
}
</style>
