<script setup>
import { towerEventsService } from "@/services/TowerEventsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

onMounted(() => {
  getEventById()
})

async function getEventById() {
  try {
    const eventId = route.params.eventId
    await towerEventsService.getEventById(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[GETTING EVENT BY ID]', error)
  }
}
</script>


<template>
  <p>Details page</p>
</template>


<style lang="scss" scoped></style>