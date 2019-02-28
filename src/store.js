import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cache: {},
    comments: [],
    error: "",
    listings: [],
    listingsLoaded: false,
    subreddit: "",
    thread: {},
    threadLoaded: false
  },
  mutations: {
    CACHE_SUB: (state, payload) => {
      Vue.set(state.cache, payload.key, {
        saved: new Date(),
        threads: payload.threads
      });
    },
    CLEAR: (state) => {
      state.comments.length = 0;
      state.listings = [];
      state.threadLoaded = false;
      state.listingsLoaded = false;
      state.thread = Object.freeze({});
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
      let cacheKey = sub + order;

      // cache
      if (state.cache[cacheKey]) {
        if ((new Date() - state.cache[cacheKey].saved) < 90000) {
          commit('UPDATE_ERROR', "");
          commit('UPDATE_SUBREDDIT', sub);
          commit('UPDATE_LISTINGS', state.cache[cacheKey].threads);
          commit('LISTINGS_LOADED');
          return;
        }
      }

      let res = await fetch(`https://www.reddit.com/r/${sub}${order}.json`);
      let response = await res.json();

      if (res.status == 404) {
        commit('UPDATE_ERROR', response.reason ? response.reason : response.message);
      } else {
        let listings = response.data.children.filter(t => {
          return t.kind == "t3"
        }).map(t => t.data);

        commit('UPDATE_ERROR', "");
        commit('UPDATE_SUBREDDIT', sub);
        commit('UPDATE_LISTINGS', listings);
        commit('CACHE_SUB', {
          key: cacheKey, 
          threads: Object.freeze([...listings])
        });
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