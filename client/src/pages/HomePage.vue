<script setup>
import { AppState } from "@/AppState";
import { towerEventsService } from "@/services/TowerEventsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted } from "vue";

const towerEvents = computed(() => AppState.towerEvents)

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
  <section class="container">
    <div class="row hero">
      <div class="col-12">
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background-image: url(https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBhcnR5fGVufDB8fDB8fHwy);
  height: 500px;
  width: auto;
  background-size: cover;
  background-position: center;

}
</style>
