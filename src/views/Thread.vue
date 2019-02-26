<template>
  <div v-if="threadLoaded" class="thread">
    <div class="thread__info">
      <h3 class="thread__info--title">
        <span v-html="thread.title"></span> 
        <span v-if="thread.domain" class="thread__info--domain">&nbsp;(<a href="">{{ thread.domain }}</a>)</span>
      </h3>
      <div class="thread__meta">
        <span class="thread__meta--score">▲ {{ thread.score | abbr }}&nbsp;</span>
        <span class="thread__meta--author">| by {{ thread.author }}</span>
        <span v-if="thread.subreddit != sub" class="thread__meta--subreddit">
          <a :href='"#/r/" + thread.subreddit'>
            r/{{ thread.subreddit }}
          </a>
        </span>
        <span class="thread__meta--time">&nbsp;{{ thread.created_utc | since }} |</span>
        <span class="thread__meta--comments">&nbsp;{{ thread.num_comments | abbr }} comments</span>
      </div>
    </div>
    <div v-if="thread.selftext_html" class="thread__content">
      <vue-markdown>{{ html }}</vue-markdown>
    </div>
    <div class="thread__comments">
      <div v-if="comments.length > 0">
        <Comment
        v-for="comment in comments"
        :author="comment.author"
        :created="comment.created"
        :score="comment.score"
        :body="comment.body"
        :replies="comment.replies"
        :submitter="comment.is_submitter"
        :key="`comment-${comment.id}`"
        />
      </div>
      <div v-else>
        No comments. 
      </div>
    </div>
  </div>
  <div v-else class="thread">
    <Loader />
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import Loader from "@/components/Loader.vue";
import VueMarkdown from 'vue-markdown'

export default {
  name: "thread",
  props: ['id', 'subreddit'],
  components: {
    Comment,
    Loader,
    VueMarkdown
  },
  created: function() {
    this.$store.dispatch(
      'getComments',
      this.$route.params
    );
  },
  computed: {
    comments () {
      return this.$store.state.comments;
    },
    html: function () {
      return this.$options.filters.clean(this.thread.selftext_html);
    },
    sub () {
      return this.$store.state.subreddit;
    },
    thread () {
      return this.$store.state.thread;
    },
    threadLoaded () {
      return this.$store.state.threadLoaded;
    }
  }
};
</script>

<style lang="scss">
  .thread {
    padding: 40px 20px 20px 20px;

    &__info {
      margin-bottom: 10px;

      &--domain {
        color: grey;
        font-size: .7em;

        & a {
          color: grey;
          text-decoration: none;
        }
      }

      &--title {
        font-size: 1.8em;
      }
    }

    &__content {
      padding: 10px 0px;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
    }

    &__comments {
      margin-top: 10px;
    }

    &__meta {
      font-size: .9em;
    }
  }
</style>