<template>
  <div
    class="container d-flex p-0 shadow-lg rounded-3 mt-4 position-relative"
    style="height: 200px"
  >
    <img
      src="https://i.scdn.co/image/ab6775700000ee85769926cc29d872eaec8dc953"
      class="m-3"
      style="border-radius: 10%; width: 100px; height: 100px"
      alt="..."
    />

    <p class="mt-4 mx-2">{{ currentTrack.tabs[tabVersion].tabber }}</p>
    <div
      class="ms-auto d-flex align-items-end flex-column mb-3"
      style="height: 200px"
    >
      <div class="p-3">2020-08-07</div>
      <div class="px-3">dfsdfd</div>

      <select
        class="form-select mt-auto p-3"
        v-if="currentTrack"
        v-model="tabVersion"
      >
        <option
          v-for="(tab, index) in this.currentTrack.tabs"
          :key="index"
          :value="index"
        >
          Version {{ index + 1 }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "TabInfo",
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentTrack"]),
    ...mapFields(["tabVersion"]),
  },
};
</script>