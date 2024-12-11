<script setup>
import { AppState } from "@/AppState";
import { towerEventsService } from "@/services/TowerEventsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const towerEvent = computed(() => AppState.activeEvent)

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
  <div v-if="towerEvent">
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="mt-3 ">
            <img :src="towerEvent.coverImg" alt="" class="hero">
          </div>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="row">
        <div class="col-md-7">
          <div class=" d-flex justify-content-around align-items-center m-5">
            <span class="fs-3 ms-4">{{ towerEvent.name }}</span>
            <span class="bg-info rounded-pill px-3">{{ towerEvent.type }}</span>
          </div>
          <div class="ms-5 px-5">
            <p>{{ towerEvent.description }}</p>
            <h6>Date and Time</h6>
            <i class="mdi mdi-calendar-clock-outline text-primary fs-5 me-2"></i>
            <span>Starts Tuesday, {{ towerEvent.startDate.toLocaleDateString() }}</span>
          </div>
          <div class="ms-5 mt-3 px-5">
            <h6>Location</h6>
            <i class="mdi mdi-map-marker text-primary fs-5 me-2"></i>
            <span>{{ towerEvent.location }}</span>
          </div>
        </div>
      </div>
      <div class="ms-5 mt-5 px-5">
        <h6>See what folks are saying...</h6>
      </div>
    </section>
  </div>

</template>


<style lang="scss" scoped>
.hero {
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
}
</style>