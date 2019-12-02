import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: "all"
  },
  mutations: {
    setFilters: (state, payload) => (state.filters = payload)
  },
  actions: {},
  getters: {
    getFilters: state => state.filters
  }
});
