<template>
  <div>
    <div class="container mt-4">
      <div class="d-flex">
        <div
          class="btn-group mb-3 ms-auto"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" class="btn btn-danger" @click="handleCapo(0)">
            -
          </button>
          <p class="px-2 pt-2">Capo {{ capo }}</p>
          <button type="button" class="btn btn-success" @click="handleCapo(1)">
            +
          </button>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-8 g-4">
        <div class="col" v-for="(beat, index) in chords" :key="index">
          <div
            class="card"
            v-on:click="changePosition(beat)"
            :style="[
              index == currentBar
                ? { border: 'solid black 3px' }
                : { background: '#FFF' },
            ]"
          >
            <div>
              <button
                type="button"
                style="height: 35px; width: 100%"
                :class="{
                  btn: true,
                  'p-0': true,
                }"
              >
                {{ beat.chord }}
              </button>
            </div>
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
  data() {
    return {
      capo: 0,
      majorChords: [
        "C",
        "C#",
        "D",
        "Eb",
        "E",
        "F",
        "F#",
        "G",
        "Ab",
        "A",
        "Bb",
        "B",
      ],
    };
  },
  computed: {
    ...mapState(["currentTrack", "spotifyPosition", "chordVersion"]),
    currentBar() {
      return this.chords.findIndex((beat) => {
        return this.spotifyPosition / 1000 < beat.start;
      });
    },
    chords() {
      let beats = this.currentTrack.chords.filter((chord) => chord.approved)[
        this.chordVersion
      ].chords;

      if (this.capo == 0) {
        return beats;
      }
      let capoChords = beats.map((beat) => {
        if (!beat.chord) {
          return beat;
        }
        let isMinor = beat.chord[beat.chord.length - 1] == "m";
        let chord = isMinor ? beat.chord.slice(0, -1) : beat.chord;
        let rawIndex = this.majorChords.indexOf(chord) + this.capo;
        let wrappedIndex = rawIndex > 11 ? rawIndex - 12 : rawIndex;
        let finalChord = `${this.majorChords[wrappedIndex]}${
          isMinor ? "m" : ""
        }`;
        return {
          ...beat,
          chord: finalChord,
        };
      });

      return capoChords;
    },
  },
  async created() {},
  methods: {
    changePosition(beat) {
      this.$store.commit("setChordPosition", beat.start);
    },
    handleCapo(upOrDown) {
      if (upOrDown) {
        if (this.capo < 11) {
          this.capo += 1;
        }
      } else {
        if (this.capo > 0) {
          this.capo -= 1;
        }
      }
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