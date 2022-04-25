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

    <TabInfo
      v-if="currentTrack && approvedTabs?.length && tabsOrChords == `tabs`"
    />

    <Flat
      v-if="currentTrack && approvedTabs?.length"
      v-show="tabsOrChords == `tabs`"
      flat
    />

    <Add v-if="currentTrack && isAdding" />

    <NoTabs
      v-if="currentTrack && !approvedTabs?.length && tabsOrChords == `tabs`"
    ></NoTabs>

    <Chords
      v-if="currentTrack?.trackAnalysis"
      v-show="tabsOrChords == `chords`"
      Chords
    />
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
import NoTabs from "@/components/Tabs/NoTabs.vue";

export default {
  name: "Track",
  components: {
    TrackDetails,
    Flat,
    Chords,
    WebPlayback,
    Add,
    TabInfo,
    NoTabs,
  },
  data() {
    return {
      tabsOrChords: "tabs",
    };
  },
  computed: {
    ...mapState(["currentTrack", "isAdding"]),
    loggedIn() {
      return Boolean(localStorage.token);
    },
    approvedTabs() {
      return this.currentTrack?.tabs?.filter((tab) => tab.approved);
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