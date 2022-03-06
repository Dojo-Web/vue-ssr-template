import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  }
];
//用户每次请求创建router实例，防止多个用户之间的router污染
export default function createRouter() {
  return new VueRouter({
    mode: "history",
    routes
  });
}
