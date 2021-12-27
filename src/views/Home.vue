<template>
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Pop Tabs</h1>
          <p class="lead text-muted">
            Pop tabs bring new age technology to the antiquated world of guitar
            chords and tablatures.
          </p>
          <p>
            <a href="#" class="btn btn-primary my-2">Explore Tabs</a>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
// @ is an alias to /src
import * as spotify from "../spotify.js";

export default {
  name: "Home",
  components: {
    // navBar
  },
  async created() {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("code")) {
      let code = params.get("code");
      console.log(code);
      let token = await spotify.getAuthToken(code);
      console.log(token);
      if (token.access_token) {
        localStorage.token = JSON.stringify(token);
        window.location.href = window.location.origin;
        //    console.log(JSON.parse(localStorage.token))
      }
    }
  },
};
</script>