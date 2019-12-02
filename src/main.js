import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

import keys from "../keys.js";

// Add the Firebase services that you want to use
import "firebase/database";

import vuetify from "./plugins/vuetify";

firebase.initializeApp(keys.firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
