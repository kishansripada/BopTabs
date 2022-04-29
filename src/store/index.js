import { createStore } from "vuex";
import * as spotify from "../spotify.js";
import { App, Credentials } from "realm-web";

import { getField, updateField } from "vuex-map-fields";

export default createStore({
   state: {
      currentToken: null,
      currentTrack: null,
      spotifyCondition: null,
      spotifyPosition: null,
      chordPosition: null,
      tabVersion: 0,
      chordVersion: 0,
      isAdding: false,
      tabsOrChords: "tabs",
      isWritingChords: false,
   },
   mutations: {
      updateField,
      setCurrentToken(state, token) {
         state.currentToken = token;
      },
      setCurrentTrack(state, track) {
         state.currentTrack = track;
      },
      setSpotifyCondition(state, condition) {
         state.spotifyCondition = condition;
      },
      setSpotifyPosition(state, position) {
         state.spotifyPosition = position;
      },
      setChordPosition(state, position) {
         state.chordPosition = position;
      },
      setIsAdding(state, adding) {
         state.isAdding = adding;
      },
      setTabVersion(state, version) {
         state.tabVersion = version;
      },
      setChordVersion(state, version) {
         state.chordVersion = version;
      },
      setIsWritingChords(state, version) {
         state.isWritingChords = version;
      },
   },
   actions: {
      async setCurrentToken(state) {
         let token = await spotify.getToken();
         state.commit("setCurrentToken", token.access_token);
      },
      async setCurrentTrack({ commit, state }, id) {
         const app = new App({ id: "boptabs-wwrqq" });
         const credentials = Credentials.anonymous();
         const user = await app.logIn(credentials);
         let mongoTrack = user.functions.getTrack(id);

         let track = spotify.getTrack(id, state.currentToken);

         let artists = spotify.getArtists(
            (await track).artists.slice(0, 3).map((artist) => artist.id),
            state.currentToken
         );

         let trackAnalysis = spotify.getTrackAnalysis(id, state.currentToken);

         Promise.all([track, trackAnalysis, artists, mongoTrack]).then((arr) => {
            track = {
               ...arr[0],
               trackAnalysis: arr[1],
               artists: arr[2],
               tabs: arr[3]?.tabs,
               chords: arr[3]?.chords,
            };
            console.log(track);
            commit("setCurrentTrack", track);
         });
      },
   },
   modules: {},
   getters: {
      getField,
   },
});
