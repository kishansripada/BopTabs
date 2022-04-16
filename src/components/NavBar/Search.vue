<template>
  <div>
    <form
      @submit.prevent="search"
      v-on:keyup="search"
      @keyup.delete="search"
      class="d-flex"
    >
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
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
              :to="`/track/${track.spotifyId}/tabs`"
              class="text-dark"
              >{{ track.name }}</router-link
            >
          </div>
          {{ track.primaryArtist }}
        </div>
        <span class="badge bg-primary rounded-pill">Tabbed</span>
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
              :to="`/track/${track.id}/tabs`"
              class="text-dark"
              >{{ track.name }}</router-link
            >
          </div>
          {{ track.artists.map((artist) => artist.name).join(", ") }}
        </div>
        <span class="badge bg-secondary rounded-pill">Not Tabbed</span>
      </li>
    </ul>
  </div>
</template>
<script>
import * as spotify from "../../spotify.js";
import * as Realm from "realm-web";

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
    const app = new Realm.App({ id: "boptabs-wwrqq" });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    this.user = user;
  },
  methods: {
    clearSearch() {
      this.searchQuery = "";
      this.mongoSearchResults = [];
      this.spotifySearchResults = [];
    },
    async search() {
      if (this.searchQuery == "") {
        this.mongoSearchResults = [];
        this.spotifySearchResults = [];
        return;
      }

      const mongoSearchResults = await this.user.functions.search(
        this.searchQuery
      );

      console.log(mongoSearchResults);

      this.mongoSearchResults = [];
      this.spotifySearchResults = [];

      this.mongoSearchResults = mongoSearchResults;

      if (mongoSearchResults.length < 4) {
        let spotifySearchResults = await spotify.search(
          this.searchQuery,
          ["track"],
          4,
          await this.$store.state.currentToken
        );

        // remove songs from Spotify that are in Algolia results
        spotifySearchResults.tracks.items =
          spotifySearchResults.tracks.items.filter((track) => {
            return !mongoSearchResults
              .map((track) => track.spotifyId)
              .includes(track.id);
          });

        this.spotifySearchResults = spotifySearchResults.tracks.items.slice(
          0,
          4 - mongoSearchResults.length
        );
        console.log(spotifySearchResults);
      }
    },
  },
};
</script>
