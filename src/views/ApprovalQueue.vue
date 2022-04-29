<template>
  <div class="container">
    <div class="d-flex">
      <p class="fs-1 mt-3" style="">Approval Queue</p>

      <button
        type="button"
        class="btn btn-dark ms-auto align-self-center"
        v-on:click="getUnapprovedTracks()"
      >
        Refresh
      </button>
    </div>

    <div class="accordion" id="accordionExample">
      <div
        class="accordion-item"
        v-for="(track, index) in unapprovedTracks"
        :key="track.spotifyId"
      >
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#` + wordify(index)"
            aria-expanded="false"
            :aria-controls="wordify(index)"
          >
            {{ track.name }}
          </button>
        </h2>
        <div
          :id="wordify(index)"
          class="accordion-collapse collapse show"
          :aria-labelledby="wordify(index)"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div class="list-group">
              <a
                class="list-group-item list-group-item-action"
                v-for="tab in track.tabs"
                :key="tab"
                >{{ tab.author }} : {{ tab.description }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as spotify from "../spotify.js";
import { App, Credentials } from "realm-web";

export default {
  name: "MyLibrary",
  components: {},
  data() {
    return {
      unapprovedTracks: [],
      loading: false,
      user: null,
    };
  },
  computed: {},

  methods: {
    async getUnapprovedTracks() {
      this.unapprovedTracks = await this.user.functions.unapprovedTabs();

      //   this.unapprovedTabs = unapprovedTracks
      //     .map((unapprovedTrack) => {
      //       return unapprovedTrack.tabs.map((unapprovedTab) => {
      //         return {
      //           ...unapprovedTrack,
      //           tabs: unapprovedTab,
      //         };
      //       });
      //     })
      //     .flat();
    },
    wordify(n) {
      var word = [],
        numbers = {
          1: "One",
          2: "Two",
          3: "Three",
          4: "Four",
          5: "Five",
          6: "Six",
          7: "Seven",
          8: "Eight",
          9: "Nine",
          10: "Ten",
          11: "Eleven",
          12: "Twelve",
          t3: "Thir",
          t5: "Fif",
          t8: "Eigh",
          20: "Twenty",
        },
        hundreds = 0 | ((n % 1000) / 100),
        tens = 0 | ((n % 100) / 10),
        ones = n % 10,
        part;

      if (n === 0) return "Zero";
      if (hundreds) word.push(numbers[hundreds] + " Hundred");

      if (tens === 0) {
        word.push(numbers[ones]);
      } else if (tens === 1) {
        word.push(
          numbers["1" + ones] || (numbers["t" + ones] || numbers[ones]) + "teen"
        );
      } else {
        part =
          numbers[tens + "0"] || (numbers["t" + tens] || numbers[tens]) + "ty";
        word.push(numbers[ones] ? part + "-" + numbers[ones] : part);
      }
      return word.join(" ");
    },
  },
  async created() {
    /////////////create mongo db client
    const app = new App({ id: "boptabs-wwrqq" });
    const credentials = Credentials.anonymous();
    const user = await app.logIn(credentials);
    this.user = user;
    /////////////create mongo db client

    this.getUnapprovedTracks();
  },
};
</script>