import Vue from "vue";
import APP from "./App.vue";
import createRouter from "./router";
import createStore from "./store";
export default function createApp() {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    render: h => h(APP)
  });
  return { app, router, store };
}
