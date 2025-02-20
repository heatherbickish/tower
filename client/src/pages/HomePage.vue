<script setup>
import { AppState } from "@/AppState";
import EventCard from "@/components/EventCard.vue";
import { towerEventsService } from "@/services/TowerEventsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted, ref } from "vue";

const account = computed(() => AppState.account)

const towerEvents = computed(() => {
  if (activeFilterType.value == 'all') return AppState.towerEvents
  return AppState.towerEvents.filter(towerEvent => towerEvent.type == activeFilterType.value)
})

const activeFilterType = ref('all')

const types = [
  { name: 'all', icon: 'mdi mdi-all-inclusive text-success' },
  { name: 'concert', icon: 'mdi mdi-guitar-electric text-warning' },
  { name: 'convention', icon: 'mdi mdi-account-group text-secondary' },
  { name: 'sport', icon: 'mdi mdi-soccer text-primary' },
  { name: 'digital', icon: 'mdi mdi-television-shimmer text-danger' }
]

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
  <!-- SECTION hero img -->
  <section class="container-fluid">
    <div class="row hero flex-column flex-end">
      <div class="col-md-7">
        <div class="text-light text p-5 m-5">
          <h3 class="mb-4">Event management for people, <br> by people</h3>
          <p>Whatever your interests, from hiking and reading to networking and skill <br> sharing, there are thousands
            of
            people who share it on Tower Events <br> are happening every day-log in to join the fun.</p>
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
      <div v-if="account" class="col-md-4 bg-light">
        <div class="p-3" role="button" type="submit" title="Create event" data-bs-toggle="modal"
          data-bs-target="#eventModal">
          <i class="mdi mdi-plus text-success fs-4 me-3"></i>
          <h5>Start an event to invite your friends</h5>
          <small>Create your own Tower event, and draw from a community of millions</small>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION catagories -->
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="m-5 px-3">
          <h4>Explore top categories</h4>
        </div>
        <div class="row justify-content-around">
          <div v-for="type in types" :key="'filter-' + type.name" class="col-md-2 bg-light text-capitalize">
            <div @click="activeFilterType = type.name" role="button" class="text-center py-2" :title="type.name">
              <i :class="type.icon"></i>
              <h6>{{ type.name }}</h6>
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
    </div>
    <div class="row justify-content-center">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4">
        <EventCard :towerEvent="towerEvent" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background-image: url(https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  height: 600px;
  width: auto;
  background-size: cover;
  background-position: center;
}

.text {
  text-shadow: 1px 2px black;
  line-height: 30px;
}
</style>
