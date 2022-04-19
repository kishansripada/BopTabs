import { createStore } from "vuex";
import * as spotify from "../spotify.js";
import * as Realm from "realm-web";

import { getField, updateField } from "vuex-map-fields";

export default createStore({
   state: {
      currentToken: null,
      currentTrack: null,
      spotifyCondition: null,
      flatCondition: "paused",
      spotifyPosition: null,
      chordPosition: null,
      tabVersion: 0,
   },
   mutations: {
      setCurrentToken(state, token) {
         state.currentToken = token;
      },
      setCurrentTrack(state, track) {
         state.currentTrack = track;
      },
      setSpotifyCondition(state, condition) {
         state.spotifyCondition = condition;
      },

      setChordPosition(state, position) {
         state.chordPosition = position;
      },

      updateField,
   },
   actions: {
      async setCurrentToken(state) {
         let token = await spotify.getToken();
         state.commit("setCurrentToken", token.access_token);
      },
      async setCurrentTrack({ commit, state }, id) {
         let track = await spotify.getTrack(id, state.currentToken);

         track.trackAnalysis = await spotify.getTrackAnalysis(id, state.currentToken);
         track.artists = await spotify.getArtists(
            track.artists.slice(0, 3).map((artist) => artist.id),
            state.currentToken
         );

         const app = new Realm.App({ id: "boptabs-wwrqq" });
         const credentials = Realm.Credentials.anonymous();
         const user = await app.logIn(credentials);
         const mongoTrack = await user.functions.getTrack(track.id);

         if (mongoTrack !== null) {
            track.tabs = mongoTrack.tabs;
            console.log("tabs in database");
         }
         console.log(track);
         commit("setCurrentTrack", track);
      },
   },
   modules: {},
   getters: {
      getField,
   },
});
