import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
   {
      path: "/",
      name: "Home",
      component: Home,
   },
   {
      path: "/track/:id/:type?",
      name: "Track",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "../views/Track.vue"),
   },
   {
      path: "/mylibrary/",
      name: "MyLibrary",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "../views/MyLibrary.vue"),
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;
