<template>
  <nav>
    <ul>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'hot' }}" class="active" tag="li">r/{{ sub }}</router-link>
      <span>|</span>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'new' }}" active-class="active" tag="li">new</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'rising' }}" active-class="active" tag="li">rising</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'controversial' }}" active-class="active" tag="li">controversial</router-link>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'top' }}" active-class="active" tag="li">top</router-link>
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
      font-weight: 600;

      li {
        list-style-type: none;
        padding: 0px 10px;
        text-align: center;
        color: rgba(0,0,0,0.35);

        &:hover {
          color: rgba(0,0,0,0.7);
          cursor: pointer;
        }

        &.active {
          color: black;
        }
      }
    }
  }
</style>
