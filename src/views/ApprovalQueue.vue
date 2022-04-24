<template>
  <div class="container">
    <div class="d-flex">
      <p class="fs-1 mt-3" style="">Approval Queue</p>

      <button
        type="button"
        class="btn btn-dark ms-auto align-self-center"
        v-on:click="getUnapprovedTracks()"
      >
        Refresh
      </button>
    </div>

    <div class="list-group" style="width: auto">
      <div v-for="track in unapprovedTabs" :key="track.spotifyId">
        <router-link
          style="text-decoration: none; color: black"
          :to="`/track/${track.spotifyId}/tabs`"
          ><a
            href="#"
            class="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
          >
            <img
              :src="`${track}`"
              alt="twbs"
              width="50"
              height="50"
              style="border-radius: 10%"
              class="flex-shrink-0"
            />
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">{{ track.name }}</h6>
                <p class="mb-0 opacity-75">
                  {{ track.primaryArtist }}
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
import * as spotify from "../spotify.js";
import * as Realm from "realm-web";

export default {
  name: "MyLibrary",
  components: {},
  data() {
    return {
      unapprovedTabs: [],
      loading: false,
      user: null,
    };
  },
  computed: {},

  methods: {
    async getUnapprovedTracks() {
      let unapprovedTracks = await this.user.functions.unapprovedTabs();

      this.unapprovedTabs = unapprovedTracks
        .map((unapprovedTrack) => {
          return unapprovedTrack.tabs.map((unapprovedTab) => {
            return {
              ...unapprovedTrack,
              tabs: unapprovedTab,
            };
          });
        })
        .flat();
    },
  },
  async created() {
    /////////////create mongo db client
    const app = new Realm.App({ id: "boptabs-wwrqq" });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    this.user = user;
    /////////////create mongo db client

    this.getUnapprovedTracks();
  },
};
</script>