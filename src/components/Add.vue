<template>
  <div>
    <div class="container p-0 shadow-lg rounded-3 mt-4" style="height: 500px">
      <form class="px-5 pt-5">
        <div class="">
          <p class="fs-4">Looks like there's no tab for this song!</p>
          <p class="fs-4">Want to upload one?</p>
          <div class="mb-3" style="">
            <label for="formFile" class="form-label"
              >Upload a MusicXML file:</label
            >
            <input
              class="form-control"
              type="file"
              ref="file"
              id="formFile"
              style="width: 500px"
              accept=".xml"
            />
          </div>
        </div>
        <button class="btn btn-primary" v-on:click="postFile()">Upload</button>
      </form>
    </div>
  </div>
</template>




<script>
import * as Realm from "realm-web";

export default {
  name: "Add",
  computed: {
    currentTrack() {
      return this.$store.state.currentTrack;
    },
  },
  data() {
    return {
      user: null,
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

      let document = {
        name: track.name,
        primaryArtist: track.artists.map((artist) => artist.name).join(", "),
        spotifyId: track.id,
        musicXml: xml,
      };

      await this.user.functions.addMusicXml(document);
    },
  },
};
</script>

<style scoped>
</style>