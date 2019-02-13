import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    comments: [],
    error: "",
    subreddit: "",
    thread: {},
    threads: []
  },
  mutations: {
    clear: (state) => {
        state.comments.length = 0;
        state.threads.length = 0;
        state.thread = Object.assign(state.thread, {});
    },
    updateComments: (state, comment) => {
        state.comments.push(comment);
    },
    updateError: (state, err) => {
        state.error = err;
    },
    updateSubreddit: (state, sub) => {
        state.subreddit = sub
    },
    updateThread: (state, thread) => {
        state.thread = Object.assign(state.thread, thread);
    },
    updateThreads: (state, thread) => {
        state.threads.push(thread);
    }
  },
  actions: {
    getListings: async ({ commit, state }, params ) => {
        let sub = params.subreddit ? params.subreddit : "popular";
        let order = params.sort ? "/" + params.sort : "";

        let res = await fetch(`https://www.reddit.com/r/${sub}${order}.json`);
        let response = await res.json();

        if (res.status == 404) {
          commit('updateError', response.reason ? response.reason : response.message);
        } else {
          commit('updateError', "");
          commit('updateSubreddit', sub);
          commit('clear');

          for (var i = 0; i < response.data.children.length; i++) {
            commit('updateThreads', response.data.children[i].data);
          }
        }
    },
    getComments: async ({ commit, state }, params ) => {
        let sub = params.subreddit ? params.subreddit : "popular";

        let res = await fetch(`https://www.reddit.com/r/${sub}/comments/${params.id}.json`);
        let response = await res.json();

        if (res.status == 404) {
          commit('updateError', response.reason ? response.reason : response.message);
        } else {
          commit('updateError', "");
          commit('updateSubreddit', sub);
          commit('clear');

          for (var i = 0; i < response[1].data.children.length; i++) {
            commit('updateThread', response[0].data.children[0].data);
            commit('updateComments', response[1].data.children[i]);
          }
        }
    }
  }
});