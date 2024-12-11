<script setup>
import { TowerEvent } from "@/models/TowerEvent";

defineProps({
  towerEvent: { type: TowerEvent, required: true }
})
</script>


<template>
  <div class="mx-3">
    <img :src="towerEvent.coverImg" alt="" class="cover-img">
  </div>
  <p>{{ towerEvent.name }}</p>
  <small>
    {{ towerEvent.location }}
  </small>
</template>


<style lang="scss" scoped>
.cover-img {
  min-height: 30dvh;
  background-size: cover;
  background-position: center;


}
</style>