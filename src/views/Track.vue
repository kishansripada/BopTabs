<template>
  <div>
    <TrackDetails v-if="currentTrack" TrackDetails />
    <div class="mt-4 container text-center" v-if="currentTrack">
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

    <Tabs v-if="currentTrack" v-show="tabsOrChords == `tabs`"> </Tabs>
    <Chords
      v-if="currentTrack?.trackAnalysis"
      v-show="tabsOrChords == `chords`"
    >
    </Chords>
    <NoTabsNoChords
      v-if="
        (currentTrack && !approvedTabs?.length && tabsOrChords == `tabs`) ||
        (currentTrack &&
          !approvedChords?.length &&
          tabsOrChords == `chords` &&
          !isWritingChords)
      "
    ></NoTabsNoChords>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import TrackDetails from "@/components/TrackDetails.vue";
import Chords from "@/components/Chords/Chords.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import WebPlayback from "@/components/WebPlayback.vue";
import NoTabsNoChords from "@/components/NoTabsNoChords.vue";

export default {
  name: "Track",
  components: {
    TrackDetails,
    Tabs,
    Chords,
    WebPlayback,
    NoTabsNoChords,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "currentTrack",
      "isWritingChords",
      "tabVersion",
      "chordVersion",
    ]),
    ...mapFields(["tabsOrChords"]),
    loggedIn() {
      return Boolean(localStorage.token);
    },
    approvedTabs() {
      return this.currentTrack?.tabs?.filter((tab) => tab.approved);
    },
    approvedChords() {
      return this.currentTrack?.chords?.filter((chord) => chord.approved);
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
        this.$store.commit("setTabVersion", 0);
        this.$store.commit("setChordVersion", 0);
      }
    );
  },
  watch: {
    tabsOrChords() {
      this.$router.push(
        `/track/${this.$route.params.id}/${this.tabsOrChords}/${
          this.tabsOrChords == "tabs"
            ? this.tabVersion + 1
            : this.chordVersion + 1
        }`
      );
    },
    tabVersion() {
      this.$router.push({
        path: `/track/${this.currentTrack.id}/tabs/${this.tabVersion + 1}`,
      });
    },
    chordVersion() {
      this.$router.push({
        path: `/track/${this.currentTrack.id}/chords/${this.chordVersion + 1}`,
      });
    },
  },
};
</script>