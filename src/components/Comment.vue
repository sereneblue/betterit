<template>
  <div :class="commentStyle">
    <div class="comment__info">
      <span class="comment__info--meta">{{ author }} {{ created | since }}</span>
      <span class="comment__toggle">[-]</span>
    </div>
    <div class="comment__data">
      {{ body }}
    </div>
    <div v-if="replies" class="replies">
      <Reply
      v-for="reply in filteredReplies"
      :author="reply.data.author"
      :created="reply.data.created"
      :score="reply.data.score"
      :body="reply.data.body_html"
      :replies="reply.data.replies"
      :depth="reply.data.depth"
      :key="reply.data.id"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: {
    author: String,
    body: String,
    created: Number,
    depth: Number,
    level: Number,
    score: Number,
    replies: [String, Object]
  },
  data: function() {
    return {
      toggled: false
    };
  },
  computed: {
    commentStyle: function () {
      return `comment depth-${this.depth}`;
    },
    filteredReplies: function () {
      return this.replies.data.children.filter(c => {
        return c.kind == "t1"
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
