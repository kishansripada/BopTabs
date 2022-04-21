<template>
  <div>
    <navBar />
    <button v-if="!token" v-on:click="connectSpotify">
      <img
        style="position: fixed; width: 250px; bottom: 15px; right: 15px"
        src="../assets/connectSpotify.svg"
      />
    </button>
    <button v-if="token && token.user" v-on:click="connectSpotify">
      <img
        style="
          position: fixed;
          width: 75px;
          bottom: 15px;
          right: 15px;
          border-radius: 50%;
        "
        :src="token.user.images[0].url"
      />
    </button>
  </div>
</template>
<script>
import querystring from "querystring";
import * as spotify from "../spotify.js";

export default {
  name: "Login",
  data() {
    return {};
  },
  computed: {
    token() {
      return JSON.parse(localStorage.token || null);
    },
  },
  async created() {
    console.log(window.location.href);
    // AFTER LOGIN///////////////////////////////
    await this.$store.dispatch("setCurrentToken");

    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("code")) {
      let code = params.get("code");
      console.log(code);
      let token = await spotify.getAuthToken(code);
      console.log(token);
      if (token.access_token) {
        localStorage.token = JSON.stringify(token);
        window.location.href = window.location.origin;
        //    console.log(JSON.parse(localStorage.token))
      }
    }
    // AFTER LOGIN///////////////////////////////

    // if there is a local token, get the user and put it in local storage
    if (this.token && !this.token.user) {
      let user = await spotify.getUser(this.token.access_token);
      localStorage.token = JSON.stringify({
        ...this.token,
        user: user,
      });
    }
  },
  methods: {
    async connectSpotify() {
      let scope = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
      ].join(" ");
      window.location.href =
        "https://accounts.spotify.com/authorize?" +
        querystring.encode({
          response_type: "code",
          client_id: "29110b23f6d14d67856438c2504dd2c4",
          scope: scope,
          redirect_uri: "http://localhost:8080/",
          // state: "state",
        });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>