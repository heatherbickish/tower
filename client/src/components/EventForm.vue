<script setup>
import { AppState } from "@/AppState";
import { towerEventsService } from "@/services/TowerEventsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const type = ['concert', 'convention', 'sport', 'digital']
const router = useRouter()

const editableEventData = ref({
  name: '',
  location: '',
  type: '',
  coverImg: '',
  startDate: '',
  capacity: '',
  description: ''
})

async function createEvent() {
  try {
    await towerEventsService.createEvent(editableEventData.value)
    editableEventData.value = {
      name: '',
      location: '',
      type: '',
      coverImg: '',
      startDate: '',
      capacity: '',
      description: ''
    }
    // Modal.getInstance('#eventModal').hide()
    // router.push({ name: 'Event Details', params: { eventId: towerEvent.id } })
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[CREATING EVENT]', error)
  }
}
</script>


<template>
  <div class="p-4 mb-4">
    <h4>Create new Event</h4>
  </div>
  <form @submit.prevent="createEvent()">
    <div class="form-floating mb-2">
      <input v-model="editableEventData.name" type="text" class="form-control" id="name" placeholder="Event Name"
        minlength="3" maxlength="50" required>
      <label for="floatingInput">Event Name</label>
    </div>
    <div class="form-floating mb-2">
      <input v-model="editableEventData.location" type="text" class="form-control" id="location"
        placeholder="Event Location" minlength="1" maxlength="500">
      <label for="floatingInput">Event Location</label>
    </div>
    <div class="form-floating mb-2">
      <select v-model="editableEventData.type" class="form-select text-capitalize" id="type" aria-label="Event Type"
        required>
        <option selected value="" disabled>Please select a type</option>
        <option v-for="type in type" :key="'option-' + type" :value="type" class="text-capitalize">
          {{ type }}
        </option>
      </select>
      <label for="category">Event Type</label>
    </div>
    <div class="input-group mb-2">
      <label for="floatingInput">Start Date</label>
      <input v-model="editableEventData.startDate" type="date" class="form-control ms-2" name="startDate" id="startDate"
        required>
    </div>
    <div class="input-group mb-2">
      <label for="floatingInput">Capacity</label>
      <input v-model="editableEventData.capacity" type="number" class="form-control ms-2" name="capacity" id="capacity"
        required>
    </div>
    <div class="form-floating mb-2">
      <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImg" placeholder="Image URL"
        maxlength="1000" required>
      <label for="floatingInput">URL ...</label>
    </div>
    <div class="form-floating mb-2">
      <textarea v-model="editableEventData.description" class="form-control" placeholder="Event Description"
        id="description" minlength="15" maxlength="1000" required></textarea>
      <label for="description">Event Description</label>
    </div>
    <div class="text-end">
      <button class="btn btn-primary" type="submit">Create Event</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>