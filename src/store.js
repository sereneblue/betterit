import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    comments: [],
    error: "",
    listings: [],
    listingsLoaded: false,
    subreddit: "",
    thread: {},
    threadLoaded: false
  },
  mutations: {
    CLEAR: (state) => {
      state.comments.length = 0;
      state.listings.length = 0;
      state.threadLoaded = false;
      state.listingsLoaded = false;
      state.thread = Object.assign(state.thread, {});
    },
    LISTINGS_LOADED: (state) => {
      Vue.set(state, 'listingsLoaded', true);
    },
    THREAD_LOADED: (state) => {
      Vue.set(state, 'threadLoaded', true);
    },
    UPDATE_COMMENTS: (state, comments) => {
      Vue.set(state, 'comments', comments);
    },
    UPDATE_ERROR: (state, err) => {
      Vue.set(state, 'err', err);
    },
    UPDATE_LISTINGS: (state, listings) => {
      Vue.set(state, 'listings', listings);
    },
    UPDATE_SUBREDDIT: (state, sub) => {
      Vue.set(state, 'subreddit', sub);
    },
    UPDATE_THREAD: (state, thread) => {
      Vue.set(state, 'thread', thread);
    }
  },
  actions: {
    clearState: ({commit, state}) => {
      commit('CLEAR');
    },
    getListings: async ({ commit, state }, params ) => {
      let sub = params.subreddit ? params.subreddit : "popular";
      let order = params.sort ? "/" + params.sort : "";

      let res = await fetch(`https://www.reddit.com/r/${sub}${order}.json`);
      let response = await res.json();

      if (res.status == 404) {
        commit('UPDATE_ERROR', response.reason ? response.reason : response.message);
      } else {
        commit('UPDATE_ERROR', "");
        commit('UPDATE_SUBREDDIT', sub);
        commit('UPDATE_LISTINGS', response.data.children.filter(t => {
          return t.kind == "t3"
        }).map(t => t.data));
        commit('LISTINGS_LOADED');
      }
    },
    getComments: async ({ commit, state }, params ) => {
      let sub = params.subreddit ? params.subreddit : "popular";

      let res = await fetch(`https://www.reddit.com/r/${sub}/comments/${params.id}.json`);
      let response = await res.json();

      if (res.status == 404) {
        commit('UPDATE_ERROR', response.reason ? response.reason : response.message);
      } else {
        commit('UPDATE_ERROR', "");
        commit('UPDATE_SUBREDDIT', sub);

        commit('UPDATE_COMMENTS', response[1].data.children.filter(c => {
          return c.kind == "t1"
        }).map(c => c.data));
        commit('UPDATE_THREAD', response[0].data.children[0].data);
        commit('THREAD_LOADED');
      }
    }
  }
});