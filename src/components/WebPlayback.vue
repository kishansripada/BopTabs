<template>
  <button>
    <img
      @click="togglePlay"
      v-if="premium"
      style="
        position: fixed;
        width: 50px;
        bottom: 15px;
        right: 50%;
        margin-right: -25px;
      "
      :src="toggleImgUrl"
    />
  </button>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "WebPlayback1",

  data() {
    return {
      signedIn: false,
      premium: Boolean(
        JSON.parse(localStorage.token).user.product == "premium"
      ),
      player: null,
      play: null,
    };
  },
  computed: {
    ...mapState(["currentTrack", "chordPosition", "spotifyCondition"]),
    toggleImgUrl() {
      if (!this.spotifyCondition || this.spotifyCondition == "paused") {
        return "https://raw.githubusercontent.com/kishansripada/BopTabs/main/src/assets/play.svg";
      } else {
        return "https://raw.githubusercontent.com/kishansripada/BopTabs/master/src/assets/pause.svg";
      }
    },
  },
  async created() {
    if (this.premium) {
      this.$store.commit("setSpotifyCondition", null);
      this.$store.commit("setSpotifyPosition", null);
      var scriptTag = document.createElement("script");
      scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
      scriptTag.async = true;
      scriptTag.id = "spotify";
      document.getElementsByTagName("head")[0].appendChild(scriptTag);

      window.onSpotifyWebPlaybackSDKReady = () => {
        this.player = new window.Spotify.Player({
          name: "Bop Tabs",
          getOAuthToken: (cb) => {
            cb(JSON.parse(localStorage.token).access_token);
          },
          volume: 0.5,
        });

        // Called when connected to the player created beforehand successfully
        this.player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);

          this.play = ({
            spotify_uri,
            playerInstance: {
              _options: { getOAuthToken, id },
            },
          }) => {
            getOAuthToken((access_token) => {
              fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({ uris: [spotify_uri] }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              );
            });
          };
        });

        this.player.connect();
      };
    }
  },
  methods: {
    togglePlay() {
      if (!this.$store.state.spotifyCondition) {
        // queue up the track
        this.play({
          playerInstance: this.player,
          spotify_uri: `spotify:track:${this.currentTrack.id}`,
        });

        // start commiting spotify position to database
        let interval = window.setInterval(() => {
          console.log("checked state");
          this.player.getCurrentState().then((state) => {
            if (state && !state.paused) {
              this.$store.commit("setSpotifyPosition", state.position);
            }
          });
        }, 50);
        this.$store.commit("setSpotifyCondition", "playing");
      } else {
        // otherwise just toggle play or pause the song
        if (this.spotifyCondition == "playing") {
          this.$store.commit("setSpotifyCondition", "paused");
        } else {
          this.$store.commit("setSpotifyCondition", "playing");
        }
        this.player.togglePlay();
      }
    },
  },
  watch: {
    currentTrack() {
      this.player.pause();
    },
    chordPosition() {
      this.player.seek(this.$store.state.chordPosition * 1000).then(() => {
        console.log("Changed position!");
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