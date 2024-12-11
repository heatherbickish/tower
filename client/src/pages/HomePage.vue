<script setup>
import { towerEventsService } from "@/services/TowerEventsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { onMounted } from "vue";

onMounted(() => {
  getEvents()
})

async function getEvents() {
  try {
    await towerEventsService.getEvents()
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[GETTING EVENTS]', error)
  }
}
</script>

<template>
  <h1>home page</h1>
</template>

<style scoped lang="scss"></style>
