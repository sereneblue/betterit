<template>
  <div class="listings">
    <div class="listing__thread" v-for="thread in threads" :key="thread.id">
        <h3>{{ thread.title }} 
          <span v-if="thread.domain">(<a href="">{{ thread.domain }}</a>)</span>
        </h3>
        <div class="listing__thread--info">
          <span class="listing__thread--score">{{ thread.score | abbr }} upvotes</span>
          <span class="listing__thread--author">by u/{{ thread.author }}</span>
          <span v-if="thread.subreddit != sub" @click="navigate(thread.subreddit)" class="listing__thread--subreddit">r/{{ thread.subreddit }}</span>
          <span class="listing__thread--time">&nbsp;{{ thread.created_utc | since }}</span>
          <span @click="navigate(sub, thread.id)" class="listing__thread--comments">&nbsp;{{ thread.num_comments | abbr }} comments</span>
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
      err: "",
      name: "",
      sub: "",
      threads: []
    };
  },
  created: async function() {
    this.sub = this.$route.params.subreddit ? this.$route.params.subreddit : "popular";

    let res = await fetch(`https://www.reddit.com/r/${this.sub}.json`);
    let response = await res.json();

    if (res.status == 404) {
      this.err = response.reason ? response.reason : response.message;
    } else {
      for (var i = 0; i < response.data.children.length; i++) {
        this.threads.push(response.data.children[i].data);
      }
    }
  }
};
</script>

<style lang="scss">
  
</style>
