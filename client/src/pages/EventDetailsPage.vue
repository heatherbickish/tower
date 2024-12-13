<script setup>
import { AppState } from "@/AppState";
import { ticketsService } from "@/services/TicketsService";
import { towerCommentsService } from "@/services/TowerCommentsService";
import { towerEventsService } from "@/services/TowerEventsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const towerEvent = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const ticketProfiles = computed(() => AppState.ticketProfiles)
const hasTickets = computed(() => ticketProfiles.value.some(ticketProfile => ticketProfile.accountId == account.value?.id))
const comments = computed(() => AppState.towerComments)

watch(route, () => {
  getEventById()
  getTicketProfileByEventId()
  getCommentByEventId()
}, { immediate: true })

const editableCommentData = ref({
  body: '',
  eventId: route.params.eventId
})

async function createComment() {
  try {
    await towerCommentsService.createComment(editableCommentData.value)
    editableCommentData.value.body = ''
  }
  catch (error) {
    Pop.meow(error)
    logger.error('[CREATING COMMENT]', error)
  }
}

async function deleteComment(commentId) {
  try {
    const yes = await Pop.confirm('Are you sure you want to delete this comment?')
    if (!yes) return
    await towerCommentsService.deleteComment(commentId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[DELETING COMMENT]', error)
  }
}

async function getCommentByEventId() {
  try {
    const eventId = route.params.eventId
    await towerCommentsService.getCommentByEventId(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('[GETTING COMMENT BY EVENT ID]', error)
  }
}

async function getTicketProfileByEventId() {
  try {
    const eventId = route.params.eventId
    await ticketsService.getTicketProfileByEventId(eventId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING TICKET PROFILES]', error)
  }
}

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

async function cancelEvent() {
  try {
    const yes = await Pop.confirm(`Are you sure want to cancel ${towerEvent.value.name} event?`, "It's a pretty cool event", "Yes I am sure!")
    if (!yes) return
    const eventId = route.params.eventId
    await towerEventsService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[CANCELLING EVENT]', error)
  }
}

async function createTicket() {
  try {
    const eventData = { eventId: route.params.eventId }
    await ticketsService.createTicket(eventData)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[CREATING TICKET]', error)
  }
}
</script>


<template>
  <!-- SECTION event img -->
  <div v-if="towerEvent">
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div :style="{ backgroundImage: `url(${towerEvent.coverImg})` }" class="mt-3 ">
            <img :src="towerEvent.coverImg" alt="" class="hero">
            <div class="text-end ">
              <span v-if="towerEvent.isCanceled" title="`${towerEvent.name} has been cancelled`"
                class="px-2 rounded bg-danger">Is Cancelled</span>
            </div>
            <div class="text-start">
              <span v-if="hasTickets" title="`You have purchased a ticket for ${towerEvent.name}`"
                class="px-2 rounded bg-primary">Attending</span>
            </div>
            <div class="text-center">
              <span v-if="towerEvent.capacity - towerEvent.ticketCount == 0"
                title="`You have purchased a ticket for ${towerEvent.name}`" class="px-2 rounded bg-success">Sold
                Out</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION event details -->
    <section class="container">
      <div class="row justify-content-between">
        <div class="col-md-7">
          <div class=" d-flex justify-content-around align-items-center m-5">
            <span class="fs-3 ms-4">{{ towerEvent.name }}</span>
            <span class="bg-info rounded-pill px-3">{{ towerEvent.type }}</span>
          </div>
          <div class="text-center mb-3">
            <button v-if="towerEvent.creatorId == account?.id" @click="cancelEvent()" class="btn btn-danger">Cancel
              Event</button>
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

        <!-- SECTION tickets and attendees -->
        <div class="col-md-2 bg-light m-5">
          <div class="text-center mt-3">
            <h6>Interested in going?</h6>
            <small>Grab a ticket!</small>
          </div>
          <div class="text-center mt-3">
            <button @click="createTicket()"
              :disabled="towerEvent.isCanceled || towerEvent.ticketCount == towerEvent.capacity"
              class="btn btn-primary">Attend</button>
          </div>
          <div class="text-end mt-2">
            <p>{{ towerEvent.capacity - towerEvent.ticketCount }} spots left</p>
          </div>
          <div class="mt-4">
            <h6>Attendees</h6>
            <div v-for="ticketProfile in ticketProfiles" :key="ticketProfile.id">
              <img :src="ticketProfile.profile.picture" :alt="ticketProfile.profile.name" class="creator-img mb-2">
              <span class="ms-2">{{ ticketProfile.profile.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION comments -->
      <div class="ms-5 mt-5 px-5">
        <h6 class="mb-5">See what folks are saying...</h6>
        <div class="row">
          <div class="col-md-7 bg-light">
            <div class="text-end mt-3 p-3">
              <p class="text-success">Join the conversation</p>
              <form @submit.prevent="createComment()">
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"></label>
                  <textarea v-model="editableCommentData.body" class="form-control" id="body" rows="3" maxlength="1000"
                    required></textarea>
                </div>
                <div class="text-end">
                  <button class="btn btn-success">Post Comment</button>
                </div>
              </form>
            </div>
            <div v-for="comment in comments" :key="comment.id" class="shadow m-3">
              <img :src="comment.creator.picture" :alt="comment.creator.name" class="creator-img m-2">
              <span>{{ comment.creator.name }}</span>
              <p class="ms-3">{{ comment.body }}</p>
              <div class="text-end m-2">
                <button @click="deleteComment(comment.id)" v-if="comment.creatorId == account?.id"
                  class="btn btn-danger">Delete Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>


<style lang="scss" scoped>
.hero {
  height: 400px;
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
}

.creator-img {
  height: 2rem;
  border-radius: 50%;
}
</style>