<template>  
  <div class="thread">
    <div class="thread__info">
      <h3>
        {{ thread.title }} 
        <span v-if="thread.domain">(<a href="">{{ thread.domain }}</a>)</span>
      </h3>
      <div class="thread__meta">
        <span class="thread__meta--score">{{ thread.score | abbr }} upvotes</span>
        <span class="thread__meta--author">by u/{{ thread.author }}</span>
        <span class="thread__meta--subreddit">
          <a v-if="thread.subreddit != sub" :href='"#/r/" + thread.subreddit'>
            r/{{ thread.subreddit }}
          </a>
        </span>
        <span class="thread__meta--time">&nbsp;{{ thread.created_utc | since }}</span>
        <span class="thread__meta--comments">&nbsp;{{ thread.num_comments | abbr }} comments</span>
      </div>
    </div>
    <div class="thread__comments">
      <Comment 
      v-for="comment in filteredComments"
      :author="comment.data.author"
      :created="comment.data.created"
      :score="comment.data.score"
      :body="comment.data.body"
      :replies="comment.data.replies"
      :depth="comment.data.depth"
      :key="comment.data.id"
      />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";

export default {
  name: "thread",
  props: ['id', 'subreddit'],
  components: {
    Comment
  },
  data: function() {
    return {
      comments: [],
      thread: {},
      sub: ""
    };
  },
  created: async function() {
    this.sub = this.$route.params.subreddit;

    let res = await fetch(`https://www.reddit.com/r/${this.sub}/comments/${this.id}.json`);
    let response = await res.json();

    if (res.status == 404) {
      this.err = response.reason;
    } else {
      for (var i = 0; i < response[1].data.children.length; i++) {
        this.thread = response[0].data.children[0].data;
        this.comments.push(response[1].data.children[i]);
      }
    }
  },
  computed: {
    filteredComments: function () {
      return this.comments.filter(c => {
        return c.kind == "t1"
      });
    }
  }
};
</script>

<style lang="scss">
  
</style>