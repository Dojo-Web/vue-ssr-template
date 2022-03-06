import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      username: "测试"
    },
    mutations: {},
    actions: {},
    modules: {}
  });
}
