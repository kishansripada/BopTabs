<template>
  <div>
    <NavBar />
    <router-view />
    <Login />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/Login.vue";

export default {
  components: {
    NavBar,
    Login,
  },
  data() {
    return {};
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