<template>
  <button>
    <img
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
  name: "WebPlayback",

  data() {
    return {
      signedIn: false,
      imgUrl:
        "https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-02-512.png",
    };
  },
  async created() {
    if (localStorage.token) {
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

        // Called when connected to the player created beforehand successfully
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);

          const play = ({
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
          play({
            playerInstance: player,
            spotify_uri: `spotify:track:${this.$store.state.currentTrack.id}`,
          });

          this.$watch(
            () => this.$store.state.currentTrack,
            async () => {
              console.log("watch fired");
              play({
                playerInstance: player,
                spotify_uri: `spotify:track:${this.$store.state.currentTrack.id}`,
              });

              //   player.getCurrentState().then((state) => {
              //     console.log(state);
              //   });
            }
          );
        });

        // Connect to the player created beforehand, this is equivalent to
        // creating a new device which will be visible for Spotify Connect
        player.connect();

        this.$refs.togglePlay.onclick = () => {
          player.togglePlay();

          player.getCurrentState().then((state) => {
            state.paused
              ? (this.imgUrl =
                  "https://image.shutterstock.com/image-vector/pause-button-vector-icon-260nw-565112785.jpg")
              : (this.imgUrl =
                  "https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-02-512.png");
          });
        };
      };
    }
  },
  methods: {
    startPlayback() {
      if (localStorage.token) {
        this.signedIn = true;
      }
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