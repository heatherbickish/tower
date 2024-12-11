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
  <p>{{ towerEvent.name }}</p>
  <small>
    {{ towerEvent.location }}
  </small>
</template>


<style lang="scss" scoped>
.cover-img {
  min-height: 30dvh;
  width: 100%;

}
</style>