<template>
  <div>
    <navBar />
    <button v-if="!isToken" v-on:click="connectSpotify">
      <img
        style="position: fixed; width: 250px; bottom: 15px; right: 15px"
        src="../assets/connectSpotify.svg"
      />
    </button>
    <button v-if="isToken && user" v-on:click="connectSpotify">
      <img
        style="
          position: fixed;
          width: 75px;
          bottom: 15px;
          right: 15px;
          border-radius: 50%;
        "
        :src="user.images[0].url"
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
    return {
      isToken: false,
      user: null,
    };
  },
  async created() {
    this.isToken = Boolean(localStorage.token);

    if (!JSON.parse(localStorage.token).user) {
      let access_token = JSON.parse(localStorage.token).access_token;
      let user = await spotify.getUser(access_token);
      this.user = user;

      let localToken = JSON.parse(localStorage.token);
      localToken.user = user;
      localStorage.token = JSON.stringify(localToken);
      console.log(user);
    }

    if (JSON.parse(localStorage.token).user) {
      this.user = JSON.parse(localStorage.token).user;
    }

    this.$watch(
      () => localStorage.token,
      async () => {
        this.isToken = Boolean(localStorage.token);
      }
    );
  },
  methods: {
    async connectSpotify() {
      let scope = ["streaming", "user-read-email", "user-read-private"].join(
        " "
      );
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