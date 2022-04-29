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
import { encode } from "querystring";
import * as spotify from "../spotify.js";

export default {
  name: "Login",
  data() {
    return {
      token: JSON.parse(localStorage.token || null),
    };
  },
  // computed: {
  //   token() {
  //     return ;
  //   },
  // },
  async created() {
    console.log(window.location);
    // AFTER LOGIN///////////////////////////////
    await this.$store.dispatch("setCurrentToken");
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("code")) {
      let code = params.get("code");
      console.log(code);
      let token = await spotify.getAuthToken(code);
      console.log(token);

      let user = await spotify.getUser(token.access_token);
      localStorage.token = JSON.stringify({
        ...token,
        user: user,
      });
      this.token = JSON.stringify({
        ...token,
        user: user,
      });
      window.location.href = window.location.origin;
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
        encode({
          response_type: "code",
          client_id: "29110b23f6d14d67856438c2504dd2c4",
          scope: scope,
          redirect_uri: window.location.origin,
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