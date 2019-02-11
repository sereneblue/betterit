<template>
  <div>
      <h2>r/{{ sub }}</h2>
      <div class="thread" v-for="thread in threads" :key="thread.id">
          <h3>{{ thread.title }} 
            <span v-if="thread.domain">(<a href="">{{ thread.domain }}</a>)</span>
          </h3>
          <div class="thread__info">
            <span class="thread__info--score">{{ thread.score | abbr }} upvotes</span>
            <span class="thread__info--author">by u/{{ thread.author }}</span>
            <span class="thread__info--subreddit">
              <a v-if="thread.subreddit != sub" :href='"#/r/" + thread.subreddit'>
                r/{{ thread.subreddit }}
              </a>
            </span>
            <span class="thread__info--time">&nbsp;{{ thread.created_utc | since }}</span>
            <span class="thread__info--comments">&nbsp;{{ thread.num_comments | abbr }} comments</span>
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
      this.err = response.reason;
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
