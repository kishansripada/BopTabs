<template>
  <div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-8 g-4">
      <div class="col" v-for="(beat, index) in chords" :key="index">
        <div class="card" v-on:click="changePosition(beat)">
          <div>
            <button
              type="button"
              style="height: 35px; width: 80x"
              :class="{
                btn: true,
                'btn-warning': index == currentBar,
              }"
            >
              {{ beat.chord }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "ViewChords",
  computed: {
    ...mapState(["currentTrack", "spotifyPosition", "chordVersion"]),
    currentBar() {
      return this.chords.findIndex((beat) => {
        return this.spotifyPosition / 1000 < beat.start;
      });
    },
    chords() {
      return this.currentTrack.chords.filter((chord) => chord.approved)[
        this.chordVersion
      ].chords;
    },
  },
  async created() {},
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