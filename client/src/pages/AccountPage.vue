<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

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
              <span class="ms-5">tickets</span>
            </div>

          </div>
          <div class="row mt-5">
            <div class="col-12 ms-5">
              <div class="ms-5">
                <h3>Upcoming Events</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- <EventCard /> -->
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
</style>
