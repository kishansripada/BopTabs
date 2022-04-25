<template>
  <div>
    <button
      style="
        position: absolute;
        left: 20px;
        margin-top: 30px;
        border: solid gray 1px;
      "
      type="button"
      :class="{
        btn: true,
      }"
    >
      Trim 1
    </button>
    <div class="container mt-4">
      <div class="row row-cols-1 row-cols-md-8 g-4">
        <div class="col" v-for="(beat, index) in userInputChords" :key="index">
          <!-- <div class="card" v-on:click="changePosition(beat)">
          <div>
            <button
                type="button"
                :class="{
                  btn: true,
                  'btn-warning': index == currentBar,
                }"
              >
                A#m
              </button>
          </div>
        </div> -->

          <div class="card" v-on:click="changePosition(beat)">
            <button type="button" :class="{ btn: true, 'btn-warning': true }">
              {{ "  " }}
            </button>
          </div>

          <select
            aria-label=".form-select-sm example"
            v-model="userInputChords[index].chord"
            class="card"
            :style="[
              index == currentBar
                ? { border: 'solid gray 3px' }
                : { background: '#FFF' },
            ]"
            :class="{
              'form-control': true,
              'form-select-sm': true,
            }"
          >
            <option selected></option>
            <option
              :value="chord"
              v-for="(chord, index) in chords"
              :key="index"
            >
              {{ chord }}
            </option>
          </select>
        </div>
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
      return this.userInputChords.findIndex((beat) => {
        return this.spotifyPosition / 1000 < beat.start;
      });
    },
  },
  data() {
    return {
      chords: [
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
        "Cm",
        "C#m",
        "Dm",
        "Ebm",
        "Em",
        "Fm",
        "F#m",
        "Gm",
        "Abm",
        "Am",
        "Bbm",
        "Bm",
      ],
      userInputChords: [],
    };
  },
  async created() {
    this.userInputChords = this.currentTrack.trackAnalysis.beats;
  },
  methods: {
    changePosition(beat) {
      this.$store.commit("setChordPosition", beat.start);
    },
    trimStartBeat() {
      this.userInputChords.shift();
    },
  },
};
</script>

<style scoped>
.outline {
  border: "solid gray 5px";
}
.row-cols-md-8 > * {
  flex: 0 0 auto;
  width: 6.25%;
}
</style>