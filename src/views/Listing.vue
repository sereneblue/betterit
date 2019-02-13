<template>
  <div class="listings">
    <div class="listing__thread" v-for="thread in threads" :key="thread.id">
        <div class="listing__list">
          <div class="listing__title">{{ thread.title }} 
            <span v-if="thread.domain">(<a href="">{{ thread.domain }}</a>)</span>
            <span v-if="thread.over_18" class="label--nsfw">NSFW</span>
          </div>
          <div v-if="thread.post_hint" class="listing__content">
            <span v-if="thread.post_hint == 'image'">IMAGE</span>
            <span v-else-if="thread.post_hint == 'rich:video'">VIDEO</span>
          </div>
          <div class="listing__thread--info">
            <span class="listing__thread--score">{{ thread.score | abbr }} upvotes</span>
            <span class="listing__thread--author">by u/{{ thread.author }}</span>
            <router-link 
              v-if="thread.subreddit != sub" 
              :to="{ name: 'subreddit', params: { subreddit: thread.subreddit, sort: 'hot' }}"
              class="listing__thread--subreddit">{{ thread.subreddit_name_prefixed }}</router-link>
            <span class="listing__thread--time">&nbsp;{{ thread.created_utc | since }}</span>
            <router-link
              :to="{ name: 'thread', params: { subreddit: thread.subreddit, id: thread.id }}"
              class="listing__thread--comments">{{ thread.num_comments | abbr }} comments</router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listing",
  props: ['subreddit'],
  data: function() {
    return {
      err: this.$store.state.error,
      sub: this.$store.state.subreddit,
      threads: this.$store.state.threads
    };
  },
  created: async function() {
    this.$store.dispatch(
      'getListings',
      this.$route.params
    );
  }
};
</script>

<style lang="scss">
  
</style>
