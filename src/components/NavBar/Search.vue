<template>
  <div>
    <form @submit.prevent="search" v-on:keyup="search" class="d-flex">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search for songs...  "
        aria-label="Search"
        v-model="searchQuery"
        style="width: 400px"
      />
    </form>

    <ul
      v-if="searchQuery"
      style="
        z-index: 1000;
        position: absolute;
        right: 20px;
        width: 430px;
        height: 500px;
        top: 60px;
        color: black;
      "
    >
      <li
        v-for="track in mongoSearchResults"
        :key="track.spotifyId"
        v-on:click="clearSearch"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="fw-bold">
            <router-link
              style="text-decoration: none"
              :to="`/track/${track.spotifyId}/tabs/1`"
              class="text-dark"
              >{{ track.name }}</router-link
            >
          </div>
          {{ track.primaryArtist }}
        </div>
        <span class="badge bg-primary rounded-pill">{{
          tabsOrChords(track)
        }}</span>
      </li>
      <li
        v-for="track in spotifySearchResults"
        :key="track.id"
        v-on:click="clearSearch"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="fw-bold">
            <router-link
              style="text-decoration: none"
              :to="`/track/${track.id}/tabs/1`"
              class="text-dark"
              >{{ track.name }}</router-link
            >
          </div>
          {{ track.artists.map((artist) => artist.name).join(", ") }}
        </div>
        <span class="badge bg-secondary rounded-pill">Not Added</span>
      </li>
    </ul>
  </div>
</template>
<script>
import * as spotify from "../../spotify.js";
import { App, Credentials } from "realm-web";
import { debounce } from "lodash";

export default {
  name: "search",
  props: {},
  data() {
    return {
      mongoSearchResults: [],
      spotifySearchResults: [],
      searchQuery: "",
      user: null,
    };
  },
  async created() {
    const app = new App({ id: "boptabs-wwrqq" });
    const credentials = Credentials.anonymous();
    const user = await app.logIn(credentials);
    this.user = user;
  },
  methods: {
    clearSearch() {
      this.searchQuery = "";
      this.mongoSearchResults = [];
      this.spotifySearchResults = [];
    },
    tabsOrChords(track) {
      let numTabs = track.tabs.filter((tab) => tab.approved).length;
      let numChords = track.chords.filter((chords) => chords.approved).length;

      if (numTabs && numChords) {
        return `${numTabs} ${
          numTabs == 1 ? "tab" : "tabs"
        } & ${numChords} chords`;
      } else if (numTabs) {
        return `${numTabs} ${numTabs == 1 ? "tab" : "tabs"}`;
      } else {
        return `${numChords} chords`;
      }
    },

    async search() {
      console.log("search fired");
      if (this.searchQuery.length == 0) {
        this.mongoSearchResults = [];
        this.spotifySearchResults = [];
        return;
      }

      this.mongoSearchResults = [];
      this.spotifySearchResults = [];
      let mongoSearchResults = await this.user.functions.search(
        this.searchQuery
      );

      // filter only songs that have approved chords or tabs
      mongoSearchResults = mongoSearchResults.filter((track) => {
        return (
          track.tabs.filter((tab) => tab.approved).length ||
          track.chords.filter((chords) => chords.approved).length
        );
      });
      console.log({ mongoSearchResults });

      this.mongoSearchResults = mongoSearchResults;

      //////////SPOTIFY
      // if less than 4 mongo results, get from spotify
      if (mongoSearchResults.length < 4) {
        let spotifySearchResults = await spotify.search(
          this.searchQuery,
          ["track"],
          4,
          await this.$store.state.currentToken
        );

        // remove songs from Spotify that are in mongo results
        spotifySearchResults = spotifySearchResults.tracks.items.filter(
          (track) => {
            return !mongoSearchResults
              .map((track) => track.spotifyId)
              .includes(track.id);
          }
        );

        this.spotifySearchResults = spotifySearchResults.slice(
          0,
          4 - mongoSearchResults.length
        );
        console.log({ spotifySearchResults });
      }
    },
  },
};
</script>
