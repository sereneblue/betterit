<template>
  <div :class="commentStyle">
    <div class="comment__info">
      <span class="comment__info-meta">
        <span :class="{ 'comment__info-meta--author': true, op: submitter }"
          ><span v-if="submitter">★ </span>{{ author }}</span
        >
        <span class="comment__info-meta--time">{{ created | since }}</span>
      </span>
      <span
        @click="hidden = !hidden"
        :class="{ comment__toggle: true, toggled: hidden }"
        >{{ toggle }}</span
      >
    </div>
    <div v-show="!hidden" class="comment__data">
      <vue-markdown>{{ html }}</vue-markdown>
    </div>
    <div v-show="replies && !hidden" class="replies">
      <Reply
        v-for="reply in filteredReplies"
        :author="reply.data.author"
        :created="reply.data.created"
        :score="reply.data.score"
        :body="reply.data.body_html"
        :replies="reply.data.replies"
        :submitter="reply.data.is_submitter"
        :key="reply.data.id"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "Comment",
  props: {
    author: {
      default: "",
      type: String
    },
    body: {
      default: "",
      type: String
    },
    created: {
      default: 0,
      type: Number
    },
    level: {
      default: 0,
      type: Number
    },
    score: {
      default: 0,
      type: Number
    },
    replies: [String, Object],
    submitter: Boolean
  },
  components: {
    VueMarkdown
  },
  data: function() {
    return {
      hidden: false
    };
  },
  computed: {
    commentStyle: function() {
      return `comment nested`;
    },
    filteredReplies: function() {
      return this.replies
        ? this.replies.data.children.filter(c => {
            return c.kind == "t1";
          })
        : [];
    },
    html: function() {
      return this.$options.filters.clean(this.body);
    },
    toggle: function() {
      return this.hidden ? "[+]" : "[–]";
    }
  }
};
</script>

<style lang="scss">
.comment {
  margin-bottom: 8px;
  padding: 12px 0px 4px 12px;

  &__data {
    padding-top: 8px;

    & ol,
    ul {
      padding: 10px 0px 10px 20px;
    }
  }

  &__info-meta {
    &--author {
      font-size: 0.95em;
      font-weight: 600;
    }

    &--time {
      font-size: 0.8em;
      padding: 0px 0.4rem;
    }
  }

  &__toggle {
    font-size: 0.9em;
    cursor: pointer;
  }

  & .nested {
    padding-top: 5px;
    margin-left: 8px;
  }

  & .replies {
    padding-top: 8px;
  }
}
</style>
