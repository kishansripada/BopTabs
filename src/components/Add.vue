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
        <button type="submit" class="btn btn-primary" v-on:click="postFile()">
          Upload
        </button>
      </form>
    </div>
  </div>
</template>




<script>
// import * as mongodb from "../mongodb.js";
export default {
  name: "Add",
  computed: {
    currentTrack() {
      return this.$store.state.currentTrack;
    },
  },
  data() {
    return {};
  },
  async created() {
    // console.log(await mongodb.findOne({ spotifyId: "7ytR5pFWmSjzHJIgog4" }));
  },
  methods: {
    async postFile() {
      const file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", file);
      formData.forEach((file) => console.log(file));
    },
  },
};
</script>

<style scoped>
</style>