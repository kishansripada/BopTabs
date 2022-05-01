<template>
  <div>
    <NavBar />
    <router-view />
    <Login />
    <WebPlayback v-if="loggedIn" />
    <footer class="bg-black text-center py-5 mt-5">
      <div class="px-5">
        <div class="text-white-50 small">
          <div class="">&copy; Bop Tabs 2022. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
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
      if (localStorage.token) {
        if (JSON.parse(localStorage.token).user) {
          return JSON.parse(localStorage.token).user;
        }
      } else {
        return null;
      }
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