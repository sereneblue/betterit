<template>
  <nav>
    <ul v-if="loaded">
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'hot' }}" class="active" tag="li">r/{{ sub }}</router-link>
      <span>|</span>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'new' }}" active-class="active" tag="li">new</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'rising' }}" active-class="active" tag="li">rising</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'controversial' }}" active-class="active" tag="li">controversial</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'top' }}" active-class="active" tag="li">top</router-link>
    </ul>
    <ul v-else>
      <li v-if="!error">Loading...</li>
      <router-link v-else :to="{ name: 'subreddit', params: { subreddit: 'popular', sort: 'hot' }}" class="active" tag="li"><= go to popular</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    error () {
      return this.$store.state.error;
    },
    sub () {
      return this.$store.state.subreddit;
    },
    theme () {
      return this.$store.state.theme;
    },
    loaded () {
      return this.$route.name == "thread" ? 
             this.$store.state.threadLoaded : this.$store.state.listingsLoaded;
    }
  },
  methods: {
    changeTheme: function () {
      this.$store.dispatch('changeTheme');
    }
  }
};
</script>

<style scoped lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    position: fixed;
    width: 100%;
    z-index: 2;

    & ul {
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      font-weight: 600;

      li {
        list-style-type: none;
        padding: 0px 10px;
        text-align: center;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
