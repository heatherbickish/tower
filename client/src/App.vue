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

:root {
  --main-height: calc(100vh - 32px - 64px);
}
</style>
