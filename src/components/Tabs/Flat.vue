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
  async created() {},
  async mounted() {
    var container = this.$refs.embedContainer;
    const embed = new Embed(container, {
      embedParams: {
        appId: "59e7684b476cba39490801c2",
        controlsPosition: "bottom",
      },
    });

    embed.loadMusicXML(this.$store.state.currentTrack.tabs);
    embed.on("play", () => {
      console.log("flat playing");
      this.$store.commit("setFlatCondition", "playing");
    });
    embed.on("pause", () => {
      console.log("flat paused");
      this.$store.commit("setFlatCondition", "paused");
    });
    // embed.on("playbackPosition", function (position) {
    //   console.log(position);
    // });
    this.$watch(
      () => this.$store.state.currentTrack,
      async () => {
        if (this.$store.state.currentTrack.tabs) {
          embed.loadMusicXML(this.$store.state.currentTrack.tabs);
        }
      }
    );
  },
};
</script>