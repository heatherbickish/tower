<script setup>

</script>


<template>
  <div class="p-4 mb-4">
    <h4>Create new Event</h4>
  </div>
  <form>
    <div class="form-floating mb-2">
      <input type="text" class="form-control" id="name" placeholder="Event Name" minlength="3" maxlength="50" required>
      <label for="floatingInput">Event Name</label>
    </div>
    <div class="form-floating mb-2">
      <input type="text" class="form-control" id="location" placeholder="Event Location">
      <label for="floatingInput">Event Location</label>
    </div>
    <div class="form-floating mb-3">
      <select class="form-select text-capitalize" id="type" aria-label="Event Type" required>
        <option selected value="" disabled>Please select a type</option>
        <option class="text-capitalize">
        </option>
      </select>
      <label for="category">Event Type</label>
    </div>
    <div class="form-floating mb-2">
      <input type="url" class="form-control" id="coverImg" placeholder="Image URL">
      <label for="floatingInput">URL ...</label>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>