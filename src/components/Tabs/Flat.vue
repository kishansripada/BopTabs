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
export default {
  name: "flat",

  computed: {},
  methods: {},
  async created() {},
  async mounted() {
    var container = this.$refs.embedContainer;
    const embed = new Embed(container, {
      embedParams: {
        appId: "59e7684b476cba39490801c2",
        controlsPosition: "bottom",
      },
    });

    embed.loadMusicXML(this.$store.state.currentTrack.tabs[0].musicXml);

    this.$watch(
      () => this.$store.state.currentTrack,
      async () => {
        embed.stop();
        if (this.$store.state.currentTrack.tabs) {
          embed.loadMusicXML(this.$store.state.currentTrack.tabs[0].musicXml);
        }
      }
    );
    this.$watch(
      () => this.$store.state.tabVersion,
      async () => {
        console.log("version changed");
        if (this.$store.state.currentTrack.tabs) {
          embed.stop();
          embed.loadMusicXML(
            this.$store.state.currentTrack.tabs[this.$store.state.tabVersion]
              .musicXml
          );
        }
      }
    );
  },
};
</script>