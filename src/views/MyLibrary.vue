<template>
  <div class="container">
    <div class="d-flex">
      <p class="fs-1 mt-3" style="">My Tabbed or Chorded Songs</p>

      <button
        type="button"
        class="btn btn-dark ms-auto align-self-center"
        v-on:click="getUserSavedTracks()"
      >
        Refresh
      </button>
    </div>

    <div class="list-group" style="width: auto">
      <div v-for="track in tabbedSavedTracks" :key="track.track.id">
        <router-link
          style="text-decoration: none; color: black"
          :to="`/track/${track.track.id}/tabs/1`"
          ><a
            href="#"
            class="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
          >
            <img
              :src="`${track.track.album.images[0].url}`"
              alt="twbs"
              width="50"
              height="50"
              style="border-radius: 10%"
              class="flex-shrink-0"
            />
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">{{ track.track.name }}</h6>
                <p class="mb-0 opacity-75">
                  {{
                    track.track.artists.map((artist) => artist.name).join(", ")
                  }}
                </p>
              </div>
              <button type="button" class="btn btn-primary">
                {{ tabsOrChords(track) }}
              </button>
            </div>
          </a></router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import WebPlayback from "@/components/WebPlayback.vue";
import * as spotify from "../spotify.js";
import { App, Credentials } from "realm-web";

export default {
  name: "MyLibrary",
  components: {
    WebPlayback,
  },
  data() {
    return {
      tabbedSavedTracks: [],
      loading: false,
      user: null,
    };
  },
  computed: {},

  methods: {
    tabsOrChords(track) {
      let numTabs = track.tabs.filter((tab) => tab.approved).length;
      let numChords = track.chords.filter((chords) => chords.approved).length;

      if (numTabs && numChords) {
        return `View ${numTabs} ${
          numTabs == 1 ? "tab" : "tabs"
        } & ${numChords} chords`;
      } else if (numTabs) {
        return `View ${numTabs} ${numTabs == 1 ? "tab" : "tabs"}`;
      } else {
        return `View ${numChords} chords`;
      }
    },
    async getUserSavedTracks() {
      //  get list of saved tracks from spotify
      let spotifySavedTracks = await spotify.getUserSavedTracks(
        JSON.parse(localStorage.token).access_token
      );

      // send list of saved track spotify ids to mongodb and return the ones that are tabbed
      let mongoSearchResults = await this.user.functions.matchSavedTracks(
        spotifySavedTracks.map((track) => track.track.id)
      );

      // console.log({ spotifySavedTracks });
      // console.log({ mongoSearchResults });

      // filter spotify saved tracks to only include those that are on mongodb then attach mongodb data to spotify tracks
      let tabbedSavedTracks = spotifySavedTracks
        .filter((track) => {
          return mongoSearchResults
            .map((track) => track.spotifyId)
            .includes(track.track.id);
        })
        .map((spotifyTrack) => {
          return {
            ...spotifyTrack,
            ...mongoSearchResults.find(
              (mongoTrack) => mongoTrack.spotifyId == spotifyTrack.track.id
            ),
          };
        });

      // push it to data variable
      this.tabbedSavedTracks = tabbedSavedTracks;
      console.log(tabbedSavedTracks);
      // push it to local storage
      localStorage.tabbedSavedTracks = JSON.stringify(tabbedSavedTracks);
    },
  },
  async created() {
    /////////////create mongo db client
    const app = new App({ id: "boptabs-wwrqq" });
    const credentials = Credentials.anonymous();
    const user = await app.logIn(credentials);
    this.user = user;
    /////////////create mongo db client

    if (
      localStorage.tabbedSavedTracks &&
      JSON.parse(localStorage.tabbedSavedTracks).length
    ) {
      this.tabbedSavedTracks = JSON.parse(localStorage.tabbedSavedTracks);
    } else {
      this.getUserSavedTracks();
    }

    this.$watch(
      () => JSON.parse(localStorage.token).access_token,
      async () => {
        this.getUserSavedTracks();
      }
    );
  },
};
</script>

