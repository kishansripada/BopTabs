<template>
  <div>
    <form @submit.prevent="search" v-on:keyup="search" class="d-flex">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="searchQuery"
        style="width: 400px"
      />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>

    <ul
      style="
        z-index: 1000;
        position: absolute;
        right: 100px;
        width: 430px;
        height: 500px;
        top: 60px;
        color: black;
      "
    >
      <li
        v-for="track in algoliaSearchResults"
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
            >
              {{ track.name }}
            </router-link>
          </div>
          {{ track.primaryArtist }}
        </div>
        <span class="badge bg-primary rounded-pill"
          >&#128293; {{ track.popularity }}</span
        >
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
            >
              {{ track.name }}
            </router-link>
          </div>
          {{ track.artists.map((artist) => artist.name).join(", ") }}
        </div>
        <span class="badge bg-primary rounded-pill">Not Tabbed</span>
      </li>
    </ul>
  </div>
</template>
<script>
import * as spotify from "../../spotify.js";
import algoliasearch from "algoliasearch";

export default {
  name: "search",
  props: {},
  data() {
    return {
      algoliaSearchResults: [],
      spotifySearchResults: [],
      searchQuery: "",
    };
  },
  async created() {},
  methods: {
    clearSearch() {
      this.searchQuery = "";
      this.algoliaSearchResults = [];
      this.spotifySearchResults = [];
    },
    async search() {
      if (this.searchQuery == "") {
        this.algoliaSearchResults = [];
        this.spotifySearchResults = [];
        return;
      }
      const client = algoliasearch(
        "...",
        "..."
      );
      const index = client.initIndex("poptabs");

      let algoliaSearchResults = await index.search(this.searchQuery, {
        getRankingInfo: true,
        analytics: false,
        enableABTest: false,
        hitsPerPage: 4,
        attributesToRetrieve: "*",
        attributesToSnippet: "*:20",
        snippetEllipsisText: "…",
        responseFields: "*",
        explain: "*",
        page: 0,
        facets: ["*"],
      });

      console.log(algoliaSearchResults);

      this.algoliaSearchResults = algoliaSearchResults.hits;

      if (algoliaSearchResults.hits.length < 4) {
        let spotifySearchResults = await spotify.search(
          this.searchQuery,
          ["track"],
          4,
          await this.$store.state.currentToken
        );

        spotifySearchResults.tracks.items =
          spotifySearchResults.tracks.items.filter((track) => {
            return !algoliaSearchResults.hits
              .map((track) => track.spotifyId)
              .includes(track.id);
          });

        this.spotifySearchResults = spotifySearchResults.tracks.items.slice(
          0,
          4 - algoliaSearchResults.hits.length
        );
        console.log(spotifySearchResults);
      }
    },
  },
};
</script>
