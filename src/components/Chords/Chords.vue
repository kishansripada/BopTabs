<template>
  <div>
    <ChordInfo v-if="approvedChords.length"></ChordInfo>
    <ViewChords v-if="!isWritingChords && approvedChords.length"></ViewChords>
    <WriteChords v-if="isWritingChords"></WriteChords>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import ViewChords from "@/components/Chords/ViewChords.vue";
import WriteChords from "@/components/Chords/WriteChords.vue";
import ChordInfo from "@/components/Chords/ChordInfo.vue";

export default {
  name: "Chords",
  components: {
    ViewChords,
    WriteChords,
    ChordInfo,
  },
  computed: {
    ...mapState(["currentTrack", "isWritingChords"]),
    approvedChords() {
      return this.currentTrack?.chords?.filter((chord) => chord.approved);
    },
  },
  created() {
    // this.$watch(
    //   () => this.$store.state.chordVersion,
    //   async () => {
    //     console.log("version changed");
    //     this.$router.push({
    //       path: `/track/${this.$store.state.currentTrack.id}/chords/${
    //         this.$store.state.chordVersion + 1
    //       }`,
    //     });
    //   }
    // );
  },
};
</script>