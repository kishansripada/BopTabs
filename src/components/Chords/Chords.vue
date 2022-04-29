<template>
  <div>
    <ChordInfo v-if="approvedChords?.length && !isWritingChords"></ChordInfo>
    <ViewChords v-if="!isWritingChords && approvedChords?.length"></ViewChords>
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
};
</script>