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

    <Flat v-if="currentTrack && currentTrack.tabs" v-show="tabs" flat />
    <div
      class="container p-0 shadow-lg rounded-3 mt-4 position-relative"
      style="height: 500px; position: relative"
      v-if="tabs && currentTrack && !currentTrack.tabs"
    >
      <h1
        class="text-center"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        Looks like there are no tabs for this song!
      </h1>
    </div>
    <Chords v-if="chords" Chords />
    <WebPlayback />
  </div>
</template>
<script>
import TrackDetails from "@/components/TrackDetails.vue";
import Flat from "@/components/Flat.vue";
import Chords from "@/components/Chords.vue";
import WebPlayback from "@/components/WebPlayback.vue";

export default {
  name: "Track",
  components: {
    TrackDetails,
    Flat,
    Chords,
    WebPlayback,
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
      }
    );
  },
};
</script>