<template>
  <div>
    <ViewChords v-if="!isWritingChords"></ViewChords>
    <WriteChords v-if="isWritingChords"></WriteChords>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import ViewChords from "@/components/Chords/ViewChords.vue";
import WriteChords from "@/components/Chords/WriteChords.vue";

export default {
  name: "Chords",
  components: {
    ViewChords,
    WriteChords,
  },
  computed: {
    ...mapState(["currentTrack", "spotifyPosition", "isWritingChords"]),
  },
  data() {
    return {};
  },
  async created() {},
  methods: {},
};
</script>

<style scoped>
</style>