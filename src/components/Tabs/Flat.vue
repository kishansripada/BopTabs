<template>
  <div>
    <div
      class="container p-0 shadow-lg rounded-3 mt-2 position-relative"
      style="height: 500px"
      ref="embedContainer"
    ></div>
  </div>
</template>

<script>
import Embed from "flat-embed";
import { mapFields } from "vuex-map-fields";

export default {
  name: "flat",
  data() {
    return {
      embed: null,
    };
  },
  computed: {
    ...mapFields(["tabVersion", "currentTrack"]),
  },
  methods: {},
  async created() {},
  async mounted() {
    var container = this.$refs.embedContainer;
    this.embed = new Embed(container, {
      embedParams: {
        appId: "59e7684b476cba39490801c2",
        controlsPosition: "bottom",
      },
    });
    this.embed.loadMusicXML(this.$store.state.currentTrack.tabs[0].musicXml);
  },
  watch: {
    currentTrack() {
      if (this.currentTrack.tabs) {
        this.embed.stop();
        this.embed.loadMusicXML(
          this.currentTrack.tabs[this.tabVersion].musicXml
        );
      }
    },
    tabVersion() {
      this.embed.stop();
      this.embed.loadMusicXML(this.currentTrack.tabs[this.tabVersion].musicXml);
    },
  },
};
</script>