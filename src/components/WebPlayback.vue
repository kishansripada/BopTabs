<template>
  <button>
    <img
      v-if="premium"
      ref="togglePlay"
      style="
        position: fixed;
        width: 50px;
        bottom: 15px;
        right: 50%;
        margin-right: -25px;
      "
      :src="imgUrl"
    />
  </button>
</template>
<script>
export default {
  name: "WebPlayback1",

  data() {
    return {
      signedIn: false,
      premium: null,
      imgUrl:
        "https://raw.githubusercontent.com/kishansripada/BopTabs/main/src/assets/play.svg",
    };
  },
  async created() {
    this.$store.commit("setSpotifyCondition", null);
    this.premium = Boolean(
      JSON.parse(localStorage.token).user.product == "premium"
    );
    if (
      localStorage.token &&
      JSON.parse(localStorage.token).user.product == "premium"
    ) {
      this.premium == true;
      var scriptTag = document.createElement("script");
      scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
      scriptTag.async = true;
      scriptTag.id = "spotify";
      document.getElementsByTagName("head")[0].appendChild(scriptTag);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Bop Tabs",
          getOAuthToken: (cb) => {
            cb(JSON.parse(localStorage.token).access_token);
          },
          volume: 0.5,
        });

        // player.addListener(
        //   "player_state_changed",
        //   ({ position, duration, track_window: { current_track } }) => {
        //     console.log(position);
        //   }
        // );

        // Called when connected to the player created beforehand successfully
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);

          let play = ({
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

          let interval = window.setInterval(() => {
            console.log("checked state");
            player.getCurrentState().then((state) => {
              if (state && !state.paused) {
                this.$store.commit("setSpotifyPosition", state.position);
              }
            });
          }, 50);

          this.$refs.togglePlay.onclick = () => {
            if (!this.$store.state.spotifyCondition) {
              play({
                playerInstance: player,
                spotify_uri: `spotify:track:${this.$store.state.currentTrack.id}`,
              });
              this.$store.commit("setSpotifyCondition", "playing");
            } else {
              player.togglePlay();
            }
          };

          this.$watch(
            () => this.$store.state.currentTrack,
            async () => {
              player.pause();
            }
          );

          this.$watch(
            () => this.$store.state.chordPosition,
            async () => {
              player.seek(this.$store.state.chordPosition * 1000).then(() => {
                console.log("Changed position!");
              });
            }
          );
        });

        // Connect to the player created beforehand, this is equivalent to
        // creating a new device which will be visible for Spotify Connect
        player.connect();
      };
    }
  },
  methods: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>