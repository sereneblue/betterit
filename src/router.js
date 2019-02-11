import Vue from "vue";
import Router from "vue-router";
import Listing from "./views/Listing.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/r/:subreddit?",
      name: "listing",
      component: Listing,
      props: true,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
