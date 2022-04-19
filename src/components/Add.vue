<template>
  <div class="p-0 shadow-lg rounded-3 mt-4 container-sm" style="height: 200px">
    <div class="ps-3 pt-3">
      <label class="form-label" v-if="currentTrack">
        Contribute to Bop Tabs by uploading your own version of
        {{ currentTrack.name }}!</label
      >
      <input
        class="form-control mb-2"
        type="file"
        ref="file"
        id="formFile"
        style="width: 500px"
        accept=".xml"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Description of your version"
        aria-label="default input example"
        v-model="description"
      />
      <button class="btn btn-primary" v-on:click="postFile()">Upload</button>
    </div>
  </div>
</template>


<script>
import * as Realm from "realm-web";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Add",
  computed: {
    ...mapState(["currentTrack"]),
  },
  data() {
    return {
      user: null,
      submitted: false,
      description: "",
    };
  },
  async created() {
    const app = new Realm.App({ id: "boptabs-wwrqq" });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    this.user = user;
  },
  methods: {
    async postFile() {
      const file = this.$refs.file.files[0];
      let xml = await file.text();
      let track = JSON.parse(JSON.stringify(this.currentTrack));

      if (track.tabs) {
        // if track exists
        this.user.functions.addNewMusicXml(track.id, {
          approved: false,
          musicXml: xml,
          rating: null,
          tabber: JSON.parse(localStorage.token).user.id,
          description: this.description,
        });
      } else {
        // if track doesn't exist
        let document = {
          name: track.name,
          primaryArtist: track.artists.map((artist) => artist.name).join(", "),
          spotifyId: track.id,
          tabs: [
            {
              approved: false,
              musicXml: xml,
              rating: null,
              tabber: JSON.parse(localStorage.token).user.id,
              description: this.description,
            },
          ],
        };

        this.user.functions.addMusicXml(document);
      }
    },
  },
};
</script>

<style scoped>
</style>