<script setup>
import { TowerEvent } from "@/models/TowerEvent";

defineProps({
  towerEvent: { type: TowerEvent, required: true }
})
</script>


<template>
  <div class="mx-3">
    <router-link :to="{ name: 'Event Details', params: { eventId: towerEvent.id } }">
      <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="cover-img"
        :title="towerEvent.startDate.toLocaleDateString()">
    </router-link>
  </div>
  <div class="ms-3 mb-4 mt-2">
    <p class="mb-0">{{ towerEvent.name }}</p>
    <p class="mb-0 text-success">Hosted by {{ towerEvent.creator.name }}</p>
    <p class="mb-0">{{ towerEvent.location }}</p>
    <p class="mb-0">{{ towerEvent.ticketCount }} attending</p>
  </div>
</template>


<style lang="scss" scoped>
.cover-img {
  height: 25dvh;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
}
</style>