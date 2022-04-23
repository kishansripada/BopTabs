<template>
  <div
    style="
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: #080808; //whatever you want
      opacity: 0;
      transition: all 0.5 linear;
      opacity: 0.5;
    "
    @click="cancel"
  ></div>

  <div
    v-if="currentTrack"
    class="rounded-3 d-flex flex-column p-4"
    style="
      top: 300px;
      right: 50%;
      margin-right: -300px;
      z-index: 100000;
      position: absolute;
      width: 600px;
      height: 300px;
      background-color: #ffffff;
      border: solid gray 5px;
    "
  >
    <h1>
      Upload your own version of
      {{
        currentTrack.name.length > 20
          ? currentTrack.name.substring(0, 20) + "..."
          : currentTrack.name
      }}
    </h1>
    <input
      class="form-control mb-2"
      type="file"
      ref="file"
      id="formFile"
      style=""
      accept=".xml"
    />

    <input
      class="form-control"
      type="text"
      placeholder="Description of your version"
      aria-label="default input example"
      v-model="description"
      style=""
    />

    <div class="d-flex flex-fill">
      <button class="btn btn-primary mt-auto me-auto" v-on:click="cancel()">
        Cancel
      </button>
      <button class="btn btn-primary ms-auto mt-auto" v-on:click="postFile()">
        Upload
      </button>
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
    isAdding() {
      return this.$store.state.isAdding;
    },
  },
  data() {
    return {
      user: null,
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
      if (file && this.description) {
        let xml = await file.text();
        let track = JSON.parse(JSON.stringify(this.currentTrack));

        if (track.tabs && this.description) {
          // if track exists
          this.user.functions.addNewMusicXml(track.id, {
            approved: false,
            musicXml: xml,
            rating: null,
            author: JSON.parse(localStorage.token).user.id,
            description: this.description,
            dateSubmitted: new Date(),
          });
        } else {
          // if track doesn't exist
          let document = {
            name: track.name,
            primaryArtist: track.artists
              .map((artist) => artist.name)
              .join(", "),
            spotifyId: track.id,
            tabs: [
              {
                approved: false,
                musicXml: xml,
                rating: null,
                author: JSON.parse(localStorage.token).user.id,
                description: this.description,
                dateSubmitted: new Date(),
              },
            ],
          };

          this.user.functions.addMusicXml(document);
        }
      }
      this.$store.commit("setIsAdding", false);
    },
    cancel() {
      this.$store.commit("setIsAdding", false);
    },
  },
};
</script>

<style scoped>
</style>