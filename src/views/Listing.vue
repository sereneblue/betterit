<template>
  <div class="listings">
    <div class="listing__thread" v-for="thread in listings" :key="`thread-${thread.id}`">
      <div class="listing__list">
        <div class="listing__title">{{ thread.title }} 
          <span v-if="thread.domain.indexOf('self.') == -1" class="listing__domain">({{ thread.domain }})</span>
          <span v-if="thread.over_18" class="label--nsfw">NSFW</span>
        </div>
        <div v-if="thread.post_hint" class="listing__content">
          <span v-if="thread.post_hint == 'image'" @mouseover.once="show(event, thread.url);">IMAGE</span>
          <span v-else-if="thread.post_hint == 'rich:video' || thread.post_hint == 'hosted:video'">VIDEO</span>
        </div>
        <div class="listing__thread-info">
          <span class="listing__thread-info--score">▲ {{ thread.score | abbr }}</span>
          <span class="listing__thread-info--author"> {{ thread.author }}</span>
          <router-link 
            v-if="thread.subreddit != sub" 
            :to="{ name: 'subreddit', params: { subreddit: thread.subreddit, sort: 'hot' }}"
            class="listing__thread-info--sub">{{ thread.subreddit_name_prefixed }}</router-link>
          <span class="listing__thread-info--time">&nbsp;{{ thread.created_utc | since }}</span>
          <router-link
            :to="{ name: 'thread', params: { subreddit: thread.subreddit, id: thread.id }}"
            class="listing__thread-info--comments">{{ thread.num_comments | abbr }} comments</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listing",
  props: ['subreddit'],
  methods: {
    show: function (e, url) {
      
    }
  },
  created: function() {
    this.$store.dispatch(
      'getListings',
      this.$route.params
    );
  },
  computed: {
    err () {
      return this.$store.state.error;
    },
    listings () {
      return this.$store.state.listings;
    },
    sub () {
      return this.$store.state.subreddit;
    }
  }
};
</script>

<style lang="scss">
  .listings {
    padding-top: 30px;
  }

  .listing {
    &__content {
      display: inline-block;
    }

    &__domain {
      color: grey;
      font-size: .7em;

      & a {
        color: grey;
        text-decoration: none;
      }
    }
    
    &__thread {
      padding: .75em .5em;
      box-shadow: 0px 0px 6px -6px #222;

      &:last-child {
        padding-bottom: 30px;
      }
    }

    &__title {
      font-size: 1.4em;
      font-weight: 600;
    }

  }

  .listing__thread-info {
    font-size: 1em;

    & * {
      padding: 0px 2px;
    }
  }
</style>
