<template>
  <div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-8 g-4">
      <div
        class="col"
        v-for="beat in this.$store.state.currentTrack.trackAnalysis.beats"
        :key="beat"
      >
        <div class="card">
          <div class="">
            <h5 class="text-center">A#m</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chords",
  computed: {
    currentTrack() {
      return this.$store.state.currentTrack;
    },
  },
  data() {
    return {
      beats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    };
  },
};
</script>

<style scoped>
.row-cols-md-8 > * {
  flex: 0 0 auto;
  width: 6.25%;
}
</style>