<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import ModalWrapper from "./components/ModalWrapper.vue";

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
  </footer>
  <ModalWrapper />
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');

body {
  font-family: "Faculty Glyphic", sans-serif;
}
</style>
