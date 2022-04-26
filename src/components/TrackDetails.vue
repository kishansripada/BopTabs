<template>
  <div
    class="container d-flex p-0 shadow-lg rounded-3 mt-5"
    style="height: 250px"
  >
    <div class="">
      <img
        class="rounded-3"
        :src="`${currentTrack.album.images[0]?.url}`"
        style="height: 250px"
      />
    </div>

    <div class="me-auto d-flex align-items-start flex-column mb-0">
      <h1 class="ms-4 mt-3">
        {{
          currentTrack.name.length > 40
            ? currentTrack.name.substring(0, 40) + "..."
            : currentTrack.name
        }}
      </h1>
      <p class="ms-4 mb-3">{{ currentTrack.album.name }}</p>
      <ul>
        <li
          v-for="artist in currentTrack.artists"
          :key="artist.id"
          class="me-5"
          style="display: inline-block"
        >
          <div class="text-center" style="width: 6rem">
            <img
              :src="artist.images[0]?.url"
              class="card-img-top rounded-3"
              style="width: 100px; height: 100px"
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
    </div>
    <div
      class="d-flex align-items-end flex-column ms-auto"
      style="height: 200px"
    >
      <div class="px-2 pt-2 bd-highlight">
        {{ currentTrack.album.release_date }}
      </div>
      <div class="px-2 pt-2 bd-highlight">
        {{ formattedTime }}
      </div>
      <div class="px-2 pt-1 bd-highlight">
        ⏱ {{ Math.round(currentTrack.trackAnalysis.track.tempo) }} bpm
      </div>

      <div class="px-2 pt-1 bd-highlight">🎼 {{ formattedKey }}</div>

      <div class="px-2 pt-1 bd-highlight">
        &#128293; {{ currentTrack.popularity }}
      </div>

      <div class="px-2 pt-1 bd-highlight fs-4">
        <img style="width: 25px" :src="timeSigImg" alt />
      </div>
      <div class="px-2 pt-1 mt-auto bd-highlight">
        <button
          v-if="tabsOrChords == `tabs`"
          class="btn btn-primary"
          v-on:click="showAddingPopup()"
        >
          Upload Your Own Tabs
        </button>

        <button
          class="btn btn-primary"
          @click="setWritingChords(true)"
          v-if="tabsOrChords == `chords` && !isWritingChords"
        >
          Write Your Own Chords
        </button>
        <button
          class="btn btn-primary"
          @click="setWritingChords(false)"
          v-if="tabsOrChords == `chords` && isWritingChords"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import querystring from "querystring";

export default {
  name: "TrackDetails",
  computed: {
    ...mapState(["isWritingChords"]),
    ...mapFields(["tabsOrChords"]),
    currentTrack() {
      return this.$store.state.currentTrack;
    },
    formattedTime() {
      let time = this.currentTrack.trackAnalysis.track.duration;
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = ~~time % 60;
      var ret = "";
      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },
    formattedKey() {
      let keys = {
        0: "C",
        1: "C#",
        2: "D",
        3: "D#",
        4: "E",
        5: "F",
        6: "F#",
        7: "G",
        8: "G#",
        9: "A",
        10: "A#",
        11: "B",
      };

      let mode = ((v) => {
        return v == 0 ? " Minor" : v == 1 ? " Major" : "";
      })(this.currentTrack.trackAnalysis.track.mode);

      return keys[this.currentTrack.trackAnalysis.track.key] + " " + mode;
    },
    timeSigImg() {
      let timeSig = this.currentTrack.trackAnalysis.track.time_signature;
      return timeSig == 3
        ? "https://raw.githubusercontent.com/kishansripada/BopTabs/master/src/assets/34.svg"
        : timeSig == 4
        ? "https://raw.githubusercontent.com/kishansripada/BopTabs/master/src/assets/44.svg"
        : "";
    },
  },
  methods: {
    showAddingPopup() {
      if (JSON.parse(localStorage.token || null)?.user) {
        // if logged in show popup
        this.$store.commit("setIsAdding", true);
      } else {
        // otherwise sign them into spotify
        let scope = [
          "streaming",
          "user-read-email",
          "user-read-private",
          "user-library-read",
        ].join(" ");
        window.location.href =
          "https://accounts.spotify.com/authorize?" +
          querystring.encode({
            response_type: "code",
            client_id: "29110b23f6d14d67856438c2504dd2c4",
            scope: scope,
            redirect_uri: "http://localhost:8080/",
            // state: "state",
          });
      }
    },
    setWritingChords(state) {
      this.$store.commit("setIsWritingChords", state);
    },
  },
};
</script>