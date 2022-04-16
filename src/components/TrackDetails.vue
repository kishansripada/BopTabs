<template>
  <div
    class="
      container
      d-flex
      position-relative
      p-0
      shadow-lg
      rounded-3
      mt-5
      position-relative
    "
    v-if="currentTrack"
    style="height: 250px"
  >
    <img
      class="rounded-3 justify-content-start"
      :src="`${currentTrack.album.images[0].url}`"
      alt
    />

    <ul>
      <h1 class="ms-4 mt-3">
        {{
          currentTrack.name.length > 50
            ? currentTrack.name.substring(0, 50) + "..."
            : currentTrack.name
        }}
      </h1>
      <p class="ms-4 mb-3">{{ currentTrack.album.name }}</p>

      <ul
        class="ps-4 overflow: auto white-space: nowrap;"
        style="display:inline margin: 0 padding: 0"
      >
        <li
          v-for="artist in currentTrack.artists"
          :key="artist.id"
          class="me-5"
          style="display: inline-block"
        >
          <div class="text-center" style="width: 6rem">
            <img
              :src="artist.images[0].url"
              class="card-img-top rounded-3"
              style="object-fit: cover; width: 100px; height: 100px"
            />
            <p class="pt-1" style="white-space: nowrap">
              {{
                artist.name.length > 16
                  ? artist.name.substring(0, 16) + "..."
                  : artist.name
              }}
            </p>
          </div>
        </li>
      </ul>
    </ul>

    <ul
      class="position-absolute bottom-0 end-0"
      style="margin-right: 15px; list-style-type: none"
    >
      <li v-if="currentTrack.explicit" class="fs-4" style="text-align: right">
        🤬
      </li>
      <li
        v-if="currentTrack.trackAnalysis.track.time_signature == 4"
        class="fs-4"
        style="text-align: right"
      >
        <img style="width: 25px" src="../assets/44.svg" alt />
      </li>
      <li
        v-if="currentTrack.trackAnalysis.track.time_signature == 3"
        class="fs-4"
        style="text-align: right"
      >
        <img style="width: 25px" src="../assets/34.svg" alt />
      </li>
      <li class style="text-align: right">
        ⏳
        {{
          (function format(time) {
            // Hours, minutes and seconds
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = ~~time % 60;
            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";
            if (hrs > 0) {
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
          })(currentTrack.trackAnalysis.track.duration)
        }}
      </li>
      <li class style="text-align: right">
        ⏱ {{ Math.round(currentTrack.trackAnalysis.track.tempo) }} bpm
      </li>

      <li class style="text-align: right">
        🎼
        {{
          ((v) => {
            return v == 0
              ? "C"
              : v == 1
              ? "C#"
              : v == 2
              ? "D"
              : v == 3
              ? "D#"
              : v == 4
              ? "E"
              : v == 5
              ? "F"
              : v == 6
              ? "F#"
              : v == 7
              ? "G"
              : v == 8
              ? "G#"
              : v == 9
              ? "A"
              : v == 10
              ? "A#"
              : v == 11
              ? "B"
              : "";
          })(currentTrack.trackAnalysis.track.key)
        }}
        {{
          ((v) => {
            return v == 0 ? " Minor" : v == 1 ? " Major" : "";
          })(currentTrack.trackAnalysis.track.mode)
        }}
      </li>
      <li class style="text-align: right">
        &#128293; {{ currentTrack.popularity }}
      </li>
    </ul>

    <p class="position-absolute top-0 end-0 mt-2 me-4">
      {{ currentTrack.album.release_date }}
    </p>
  </div>
  <!-- 
  <div v-else class="position-relative">
    <div
      class="spinner-border position-absolute top-100 start-50 translate-middle"
      role="status"
    >
    <span class="position-relative">Loading...</span>
    </div>
  </div> -->
</template>
<script>
export default {
  name: "TrackDetails",
  computed: {
    currentTrack() {
      return this.$store.state.currentTrack;
    },
  },
};
</script>