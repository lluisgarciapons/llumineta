<template>
  <v-app>
    <Toolbar />
    <v-content id="scrolling-techniques-5">
      <Llumineta />
    </v-content>
  </v-app>
</template>

<script>
import Llumineta from "./views/Llumineta";
import Toolbar from "./components/Toolbar";

export default {
  name: "App",

  components: {
    Llumineta,
    Toolbar
  },

  data: () => ({
    //
  })
};
</script>
<style>
#scrolling-techniques-5 {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
