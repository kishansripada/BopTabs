<template>
  <div>
    <p class="fs-1 container mt-3">Tabbed Tracks</p>

    <div class="list-group container" style="width: auto">
      <div v-for="track in savedTracksTabbed" :key="track.track.id">
        <router-link
          style="text-decoration: none; color: black"
          :to="`/track/${track.track.id}/tabs`"
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
              <button type="button" class="btn btn-primary">View Tab</button>
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
import algoliasearch from "algoliasearch";

export default {
  name: "MyLibrary",
  components: {
    WebPlayback,
  },
  data() {
    return {
      savedTracksTabbed: [],
      savedTracksNotTabbed: [],
    };
  },
  computed: {},

  methods: {
    async getUserSavedTracks() {
      function chunk(array, chunkSize) {
        return [].concat.apply(
          [],
          array.map(function (elem, i) {
            return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
          })
        );
      }

      //  get saved tracks from spotify
      let savedTracks = (
        await spotify.getUserSavedTracks(
          JSON.parse(localStorage.token).access_token
        )
      ).items;

      const client = algoliasearch(
        "1K06LV6AVV",
        "ad8c4813da30000629dae46a575bebde"
      );

      let groupsOfQueries = chunk(savedTracks, 50).map((chunk) =>
        chunk.map((track) => {
          return {
            indexName: "poptabs",
            query: track.track.id,
            params: {
              hitsPerPage: 1,
              restrictSearchableAttributes: ["spotifyId"],
            },
          };
        })
      );

      let hits = await Promise.all(
        groupsOfQueries.map((queries) => client.multipleQueries(queries))
      );

      hits = hits.map((hit) => hit.results).flat();

      // attack isTab property to saved tracks
      for (let i = 0; i < savedTracks.length; i++) {
        savedTracks[i].track.isTabbed = Boolean(hits[i].nbHits);
      }

      let savedTracksTabbed = [];
      let savedTracksNotTabbed = [];

      savedTracks.forEach((track) => {
        if (track.track.isTabbed) {
          savedTracksTabbed.push(track);
        } else {
          savedTracksNotTabbed.push(track);
        }
      });
      this.savedTracksTabbed = savedTracksTabbed;
      this.savedTracksNotTabbed = savedTracksNotTabbed;

      localStorage.savedTracksTabbed = JSON.stringify(savedTracksTabbed);
      localStorage.savedTracksNotTabbed = JSON.stringify(savedTracksNotTabbed);
    },
  },
  async created() {
    await this.$store.dispatch("setCurrentToken");
    if (
      localStorage.savedTracksTabbed &&
      JSON.parse(localStorage.savedTracksTabbed).length
    ) {
      this.savedTracksTabbed = JSON.parse(localStorage.savedTracksTabbed);
      this.savedTracksNotTabbed = JSON.parse(localStorage.savedTracksNotTabbed);
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