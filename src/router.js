import Vue from "vue";
import Router from "vue-router";
import Listing from "./views/Listing.vue";
import Thread from "./views/Thread.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Listing
    },
    {
      path: "/r/:subreddit/:sort?",
      name: "subreddit",
      component: Listing,
      props: true
    },
    {
      path: "/r/:subreddit/t/:id",
      name: "thread",
      component: Thread,
      props: true
    }
  ]
});
