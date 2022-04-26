<template>
  <div>
    <TabInfo v-if="approvedTabs?.length" />
    <Flat v-if="approvedTabs?.length" flat />
    <AddTab v-if="isAdding" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import Flat from "@/components/Tabs/Flat.vue";
import AddTab from "@/components/Tabs/AddTab.vue";
import TabInfo from "@/components/Tabs/TabInfo.vue";

export default {
  name: "Tabs",
  components: {
    AddTab,
    TabInfo,
    Flat,
  },
  computed: {
    ...mapState(["currentTrack", "isAdding"]),
    approvedTabs() {
      return this.currentTrack?.tabs?.filter((tab) => tab.approved);
    },
  },
};
</script>