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
  async created() {},
};
</script>