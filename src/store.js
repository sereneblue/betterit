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
    nsfw: false,
    subreddit: "",
    theme: "light",
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
    CHANGE_THEME: (state) => {
      state.theme = state.theme == "light" ? "dark" : "light";
    },
    CLEAR: (state) => {
      state.comments.length = 0;
      state.listings = [];
      state.threadLoaded = false;
      state.listingsLoaded = false;
      state.nsfw = false;
      state.thread = Object.freeze({});
    },
    LISTINGS_LOADED: (state) => {
      Vue.set(state, 'listingsLoaded', true);
    },
    NSFW_SUB: (state) => {
      state.nsfw = true;
    },
    THREAD_LOADED: (state) => {
      Vue.set(state, 'threadLoaded', true);
    },
    UPDATE_COMMENTS: (state, comments) => {
      Vue.set(state, 'comments', comments);
    },
    UPDATE_ERROR: (state, err) => {
      Vue.set(state, 'error', err);
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
    changeTheme: ({commit, state}) => {
      commit('CHANGE_THEME');
    },
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

      let res = await fetch(`https://www.reddit.com/r/${sub}${order}.json`, {
          redirect: 'manual'
      });
      let response = await res.json();

      if (res.status == 404 || res.status == 403) {
        commit('UPDATE_ERROR', response.reason ? response.reason : response.message);
      } else {
        // check if nsfw
        if (!sub.includes('+')) {
          res = await fetch(`https://www.reddit.com/r/${sub}/about.json`);

          if (res.status == 200) {
            let aboutRes = await res.json();

            if (aboutRes.data && aboutRes.data.over18) {
              commit('NSFW_SUB');
            }
            document.title = aboutRes.data.public_description || `betterit - ${aboutRes.data.display_name_prefixed}`;
          } else {
            document.title = `betterit - ${sub}`;
          }
        } else {
          document.title = `Posts from ${sub.replace('+', ', ')}`;
        }

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

      if (res.status == 404 || res.status == 403) {
        commit('UPDATE_ERROR', response.reason ? response.reason : response.message);
      } else {
        document.title = `${response[0].data.children[0].data.title} : ${response[0].data.children[0].data.subreddit}`;

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