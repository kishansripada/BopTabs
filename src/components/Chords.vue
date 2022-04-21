<template>
  <div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-8 g-4">
      <div
        class="col"
        v-for="(beat, index) in this.$store.state.currentTrack.trackAnalysis
          .beats"
        :key="index"
      >
        <a>
          <div
            class="card"
            :class="{ active: index == currentBar }"
            v-on:click="changePosition(beat)"
          >
            <div>
              <button
                type="button"
                :class="{
                  btn: true,
                  'btn-info': !(index == currentBar),
                  'btn-warning': index == currentBar,
                }"
              >
                A#m
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Chords",
  computed: {
    ...mapState(["currentTrack", "spotifyPosition"]),
    currentBar() {
      return this.currentTrack.trackAnalysis.beats.findIndex((beat) => {
        return this.spotifyPosition / 1000 < beat.start;
      });
    },
  },
  data() {
    return {};
  },
  async created() {
    this.currentBar = this.currentTrack.trackAnalysis.beats.findIndex(
      (beat) => {
        return this.spotifyPosition / 1000 < beat.start;
      }
    );
  },
  methods: {
    changePosition(beat) {
      this.$store.commit("setChordPosition", beat.start);
    },
  },
};
</script>

<style scoped>
.row-cols-md-8 > * {
  flex: 0 0 auto;
  width: 6.25%;
}
</style>