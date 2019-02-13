<template>
  <nav>
    <h1>r/{{ sub }}</h1>
    <ul>
      <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'hot' }}" tag="li">hot</router-link>
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
</style>
