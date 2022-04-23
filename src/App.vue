<template>
  <div>
    <NavBar />
    <router-view />
    <Login />
    <WebPlayback v-if="loggedIn" />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/Login.vue";
import WebPlayback from "@/components/WebPlayback.vue";

export default {
  components: {
    NavBar,
    Login,
    WebPlayback,
  },
  data() {
    return {};
  },
  computed: {
    loggedIn() {
      return Boolean(localStorage.token);
    },
  },

  async created() {},
  methods: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>