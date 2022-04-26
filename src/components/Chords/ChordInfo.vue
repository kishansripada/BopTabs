<template>
  <div
    class="container d-flex p-0 shadow-lg rounded-3 mt-4 position-relative"
    style="height: 100px"
  >
    <img
      :src="authorProfilePic"
      class="m-3"
      style="border-radius: 10%; width: 75px; height: 75px"
    />
    <div class="me-auto d-flex align-items-start flex-column">
      <p class="mt-3 mx-2">{{ currentTrack.chords[chordVersion].author }}</p>
      <p class="mx-2">{{ currentTrack.chords[chordVersion].description }}</p>
    </div>

    <div class="ms-auto d-flex align-items-end flex-column mb-3" style="">
      <div class="p-3">
        <!-- {{ currentTrack.chords[chordVersion].dateSubmitted.slice(0, 10) }} -->
      </div>

      <select
        class="form-select mt-auto mx-2"
        v-if="currentTrack"
        v-model="chordVersion"
      >
        <option
          v-for="(chord, index) in approvedChords"
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
import * as spotify from "../../spotify.js";

export default {
  name: "ChordInfo",
  data() {
    return {
      authorProfilePic: null,
    };
  },
  computed: {
    ...mapState(["currentTrack", "currentToken"]),
    ...mapFields(["chordVersion"]),
    approvedChords() {
      return this.currentTrack.chords.filter((chord) => chord.approved);
    },
  },
  async created() {
    this.$store.commit("setChordVersion", this.$route.params.version - 1);

    this.authorProfilePic = (
      await spotify.getOtherUser(
        this.currentTrack.chords[this.chordVersion].author,
        this.currentToken
      )
    ).images[0].url;
  },
  watch: {
    async chordVersion() {
      this.authorProfilePic = (
        await spotify.getOtherUser(
          this.currentTrack.chords[this.chordVersion].author,
          this.currentToken
        )
      ).images[0].url;
    },
  },
};
</script>