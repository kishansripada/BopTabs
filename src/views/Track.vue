<template>
  <div>
    <TrackDetails TrackDetails />
    <div class="mt-4 container text-center">
      <div
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          v-on:click="tabsClicked"
          v-bind="tabs"
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          :checked="tabs"
        />
        <label class="btn btn-outline-primary" for="btnradio1">Tabs</label>

        <input
          v-on:click="chordsClicked"
          v-bind="chords"
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          :checked="chords"
        />
        <label class="btn btn-outline-primary" for="btnradio3">Chords</label>
      </div>
    </div>

    <TabInfo v-if="currentTrack && currentTrack.tabs" />

    <Flat v-if="currentTrack && currentTrack.tabs" v-show="tabs" flat />

    <Add />

    <Chords
      v-if="currentTrack && currentTrack.trackAnalysis"
      v-show="chords"
      Chords
    />
    <WebPlayback />
  </div>
</template>
<script>
import TrackDetails from "@/components/TrackDetails.vue";
import Flat from "@/components/Tabs/Flat.vue";
import Chords from "@/components/Chords.vue";
import WebPlayback from "@/components/WebPlayback.vue";
import Add from "@/components/Add.vue";
import TabInfo from "@/components/Tabs/TabInfo.vue";

export default {
  name: "Track",
  components: {
    TrackDetails,
    Flat,
    Chords,
    WebPlayback,
    Add,

    TabInfo,
  },
  data() {
    return {
      tabs: this.$route.params.type == "tabs",
      chords: this.$route.params.type == "chords",
    };
  },
  computed: {
    currentTrack() {
      return this.$store.state.currentTrack;
    },
  },

  methods: {
    async tabsClicked() {
      this.tabs = true;
      this.chords = false;
      this.$router.push({
        path: `/track/${this.$route.params.id}/tabs`,
      });
    },
    async chordsClicked() {
      this.chords = true;
      this.tabs = false;
      this.$router.push({
        path: `/track/${this.$route.params.id}/chords`,
      });
    },
  },
  async created() {
    await this.$store.dispatch("setCurrentToken");
    await this.$store.dispatch("setCurrentTrack", this.$route.params.id);
    this.$watch(
      () => this.$route.params.type,
      async () => {
        this.tabs = this.$route.params.type == "tabs";
        this.chords = this.$route.params.type == "chords";
      }
    );

    this.$watch(
      () => this.$route.params.id,
      async () => {
        await this.$store.dispatch("setCurrentTrack", this.$route.params.id);
        this.$store.commit("setSpotifyCondition", null);
      }
    );
  },
};
</script>