<template>
  <nav>
    <ul>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'hot' }}" class="sub" tag="li">r/{{ sub }}</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'new' }}" tag="li">new</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'rising' }}" tag="li">rising</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'controversial' }}" tag="li">controversial</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'top' }}" tag="li">top</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    sub () {
      return this.$store.state.subreddit;
    }
  }
};
</script>

<style scoped lang="scss">
  nav {
    background-color: olive;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    position: fixed;
    width: 100%;

    & ul {
      display: flex;
      flex-direction: row;
      margin: 0 auto;

      li {
        list-style-type: none;
        padding-right: 20px;
        text-align: center;
      }
    }
    
    & .sub {
      font-weight: 600;
    }
  }
</style>
