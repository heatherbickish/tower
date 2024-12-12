<script setup>
import { TowerEvent } from "@/models/TowerEvent";

defineProps({
  towerEvent: { type: TowerEvent, required: true }
})
</script>


<template>
  <div class="mx-3">
    <router-link :to="{ name: 'Event Details', params: { eventId: towerEvent.id } }">
      <img :src="towerEvent.coverImg" alt="" class="cover-img">
    </router-link>
  </div>
  <div class="ms-3 mb-4 ">
    <p class="mb-0">{{ towerEvent.name }}</p>
    <small>{{ towerEvent.location }}</small>
  </div>
</template>


<style lang="scss" scoped>
.cover-img {
  height: 25dvh;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>