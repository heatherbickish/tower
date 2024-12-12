<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from "@/utils/Pop.js";
import { logger } from "@/utils/Logger.js";
import { ticketsService } from "@/services/TicketsService.js";

const account = computed(() => AppState.account)
const ticketEvents = computed(() => AppState.ticketEvents)

onMounted(() => {
  getMyTicketEvents()
})

async function getMyTicketEvents() {
  try {
    await ticketsService.getMyTicketEvents()
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING MY TICKET EVENTS]', error)
  }
}

async function deleteTicket(ticketId) {
  try {
    const yes = await Pop.confirm('Are you sure you want to unattend this event?')
    if (!yes) return
    await ticketsService.deleteTicket(ticketId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[DELETING TICKET]', error)
  }
}

</script>

<template>
  <div class="">
    <div v-if="account">
      <div class="container">
        <section class="row">
          <div class="col-12 mt-5">
            <div class="p-5 ms-5">
              <img :src="account.picture" :alt="account.name" class="creator-img">
              <span class="ms-4 me-4 fs-1">{{ account.name }}</span>
              <span class="ms-5">events</span>
              <span class="ms-5">{{ ticketEvents.length }} tickets</span>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 ms-5">
              <div class="ms-5">
                <h3>Upcoming Events</h3>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div v-for="ticketEvent in ticketEvents" :key="ticketEvent.id" class="col-md-4">
              <div class="m-3">
                <img :src="ticketEvent.towerEvent.coverImg" :alt="ticketEvent.towerEvent.name" class="cover-img ms-5">
                <div>
                  <small class="ms-5">{{ ticketEvent.towerEvent.name }}</small>
                  <small @click="deleteTicket(ticketEvent.id)" role="button"
                    class="bg-info rounded ms-2 px-2">Unattend</small>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.creator-img {
  height: 8rem;
  border-radius: 50%;
}

.cover-img {
  height: 25dvh;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
