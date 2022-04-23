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
      isAdding: false,
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
   },
   actions: {
      async setCurrentToken(state) {
         let token = await spotify.getToken();
         state.commit("setCurrentToken", token.access_token);
      },
      async setCurrentTrack({ commit, state }, id) {
         const app = new Realm.App({ id: "boptabs-wwrqq" });
         const credentials = Realm.Credentials.anonymous();
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
               trackAnalysis: { ...arr[1], bars: arr[1].bars.reverse() },
               artists: arr[2],
               tabs: arr[3]?.tabs,
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
