<template>
  <div
    class="container d-flex p-0 shadow-lg rounded-3 mt-4 position-relative"
    style="height: 200px"
  >
    <h1
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        text-align: center;
      "
    >
      There are no tabs for this song 😪 Upload your own!
    </h1>
    <img src="" alt="" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "NoTabs",
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentTrack"]),
    ...mapFields(["tabVersion"]),
    approvedTabs() {
      return this.currentTrack.tabs.filter((tab) => tab.approved);
    },
  },
};
</script>