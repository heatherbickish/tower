<script setup>
import { AppState } from "@/AppState";
import EventCard from "@/components/EventCard.vue";
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
  <section class="container-fluid">
    <div class="row hero">
      <div class="col-md-6">
        <div class="d-flex justify-content-end flex-column flex-end text-light p-4 ms-4 lh-2">
          <h3>Event management for people, by people</h3>
          <p>Whatever your interests, from hiking and reading to networking and skill sharing, there are thousands of
            people who share it on Tower Events are happening every day-log in to join the fun.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="m-5 px-3">
          <h4>How Tower works</h4>
        </div>
      </div>
    </div>
    <div class="row justify-content-around">
      <div class="col-md-4 bg-light">
        <div class="p-3">
          <i class="mdi mdi-magnify text-success fs-4 me-3"></i>
          <h5>Discover events you're interested in</h5>
          <small>Browse through community hosted events for all the things you love</small>
        </div>
      </div>
      <div class="col-md-4 bg-light">
        <div class="p-3">
          <i class="mdi mdi-plus text-success fs-4 me-3"></i>
          <h5>Discover events you're interested in</h5>
          <small>Create your own Tower event, and draw from a community of millions</small>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="m-5 px-3">
          <h4>Explore top categories</h4>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-1 bg-light">
            <div class="text-center py-2">
              <i class="mdi mdi-all-inclusive text-success"></i>
              <h6>All</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="m-5 px-3">
          <h4>Upcoming events</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-4">
          <EventCard :towerEvent="towerEvent" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background-image: url(https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  height: 500px;
  width: auto;
  background-size: cover;
  background-position: center;

}
</style>
