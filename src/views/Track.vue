<template>
  <div>
    <TrackDetails v-if="currentTrack" TrackDetails />
    <div class="mt-4 container text-center">
      <div
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          id="btnradio1"
          :checked="tabsOrChords == `tabs`"
          value="tabs"
          v-model="tabsOrChords"
        />
        <label class="btn btn-outline-primary" for="btnradio1">Tabs</label>

        <input
          type="radio"
          class="btn-check"
          id="btnradio3"
          value="chords"
          :checked="tabsOrChords == `chords`"
          v-model="tabsOrChords"
        />
        <label class="btn btn-outline-primary" for="btnradio3">Chords</label>
      </div>
    </div>

    <TabInfo v-if="currentTrack?.tabs" />

    <Flat v-if="currentTrack?.tabs" v-show="tabsOrChords == `tabs`" flat />

    <Add />

    <Chords
      v-if="currentTrack?.trackAnalysis"
      v-show="tabsOrChords == `chords`"
      Chords
    />
    <WebPlayback v-if="loggedIn" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
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
      tabsOrChords: "tabs",
    };
  },
  computed: {
    ...mapState(["currentTrack"]),
    loggedIn() {
      return Boolean(localStorage.token);
    },
  },

  methods: {},
  async created() {
    this.$store.dispatch("setCurrentToken");
    this.$store.dispatch("setCurrentTrack", this.$route.params.id);

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