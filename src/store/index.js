import { createStore } from "vuex"
import * as spotify from "../spotify.js"
import algoliasearch from "algoliasearch"

export default createStore({
  state: {
    currentToken: null,
    currentTrack: null,
  },
  mutations: {
    setCurrentToken(state, token) {
      state.currentToken = token
    },
    setCurrentTrack(state, track) {
      state.currentTrack = track
    },
  },
  actions: {
    async setCurrentToken(state) {
      let token = await spotify.getToken()
      state.commit("setCurrentToken", token.access_token)
    },
    async setCurrentTrack({ commit, state }, id) {
      let track = await spotify.getTrack(id, state.currentToken)

      track.trackAnalysis = await spotify.getTrackAnalysis(
        id,
        state.currentToken
      )
      track.artists = await spotify.getArtists(
        track.artists.slice(0, 3).map((artist) => artist.id),
        state.currentToken
      )

      let tabs = await fetch(
        `https://raw.githubusercontent.com/kishansripada/poptabs/main/${track.id}.xml`
      ).then((r) => r.text())

      if (tabs !== "404: Not Found") {
        console.log("in database")
        track.tabs = tabs
      }
      commit("setCurrentTrack", track)
    },
  },
  modules: {},
  getters: {},
})
