<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          @click="setFilters(item.value), (drawer = false)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <div>
    <v-app-bar color="deep-purple accent-4" dark fixed elevate-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div> -->

    <v-app-bar
      fixed
      app
      absolute
      color="#121212"
      dark
      elevate-on-scroll
      shrink-on-scroll
      prominent
      dense
      src="~@/assets/logo.png"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="190"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgb(93, 5, 33,.5), rgb(39, 76, 11,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-btn icon> </v-btn> -->

      <v-toolbar-title>Llumineta Esplai Minuatx</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> -->
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      full: "all",
      items: [
        { icon: "mdi-infinity", text: "TOTS", value: "all" },
        { icon: "mdi-calendar-check-outline", text: "LLIURES", value: false },
        { icon: "mdi-cancel", text: "OCUPATS", value: true }
      ]
    };
  },
  methods: {
    ...mapMutations(["setFilters"])
  }
};
</script>

<style scoped>
.menu_icon {
  position: absolute;
  width: 40px;
  z-index: 2;
  border-radius: 50%;
}
</style>
