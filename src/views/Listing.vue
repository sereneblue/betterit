<template>
  <div v-if="listingsLoaded" class="listings">
    <div v-if="nsfw && !confirmNSFW" class="subreddit-alert">
      <div class="subreddit-alert--icon">
        <WarningIcon />
      </div>
      <div class="subreddit-alert--msg">
        You must be at least eighteen years old to view this content. Are you over eighteen and willing to see adult content?  
      </div>
      <div class="subreddit-alert--buttons">
        <button @click="confirmNSFW = true;">Yes</button>
        <button @click="goToHome();">No</button>
      </div>
    </div>
    <div v-else>
      <div @click="goToThread(thread)" class="listing__thread" v-for="thread in listings" :key="`thread-${thread.id}`">
        <div class="listing__list">
          <div class="listing__title">
            <span v-html="thread.title"></span> 
            <span v-if="thread.domain.indexOf('self.') == -1" class="listing__domain">&nbsp;({{ thread.domain }})</span>
            <span v-if="thread.over_18" class="nsfw-label">NSFW</span>
          </div>
          <div v-if="thread.post_hint" class="listing__content">
            <span v-if="thread.post_hint == 'image'" @mouseover.once="show(event, thread.url);">IMAGE</span>
            <span v-else-if="thread.post_hint == 'rich:video' || thread.post_hint == 'hosted:video'">VIDEO</span>
          </div>
          <div class="listing__thread-info">
            <span class="listing__thread-info--score">▲ {{ thread.score | abbr }}</span>
            <span class="listing__thread-info--author">| by {{ thread.author }}</span>
            <router-link 
              v-if="thread.subreddit != sub" 
              :to="{ name: 'subreddit', params: { subreddit: thread.subreddit, sort: 'hot' }}"
              class="listing__thread-info--sub">{{ thread.subreddit_name_prefixed }}</router-link>
            <span class="listing__thread-info--time">{{ thread.created_utc | since }} |</span>
            <router-link
              :to="{ name: 'thread', params: { subreddit: thread.subreddit, id: thread.id }}"
              class="listing__thread-info--comments">{{ thread.num_comments | abbr }} comments</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="listings">
    <div v-if="error" class="subreddit-alert">
      <div class="subreddit-alert--icon">
        <LockIcon v-if="error == 'private'" />
        <CloseCircleIcon v-else-if="error == 'banned'" />
      </div>
      <div class="subreddit-alert--msg">
        {{ errorMessage }}
      </div>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import LockIcon from 'vue-ionicons/dist/md-lock.vue'
import CloseCircleIcon from 'vue-ionicons/dist/md-close-circle.vue'
import WarningIcon from 'vue-ionicons/dist/md-warning.vue'

export default {
  name: "listing",
  props: ['subreddit'],
  components: {
    CloseCircleIcon,
    Loader,
    LockIcon,
    WarningIcon
  },
  data: function() {
    return {
      confirmNSFW: false
    }
  },
  created: function() {
    this.$store.dispatch(
      'getListings',
      this.$route.params
    );
  },
  computed: {
    error () {
      return this.$store.state.error;
    },
    errorMessage () {
      if (this.error == "private") {
        return "You must be invited to visit this community";
      } else if (this.error == "banned") {
        return `This subreddit has been banned from Reddit`;
      }
    },
    listings () {
      return this.$store.state.listings;
    },
    listingsLoaded () {
      return this.$store.state.listingsLoaded;
    },
    nsfw () {
      return this.$store.state.nsfw;
    },
    sub () {
      return this.$store.state.subreddit;
    }
  },
  methods: {
    goToThread: function (thread) {
      this.$router.push({ name: 'thread', params: { subreddit: thread.subreddit, id: thread.id }});
    },
    goToHome: function (thread) {
      this.$router.push({ name: 'subreddit', params: { subreddit: 'popular' }});
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
    }
    
    &__thread {
      padding: .75em .5em;
      box-shadow: 0px 0px 6px -6px #222;

      &:last-child {
        padding-bottom: 30px;
      }

      &:hover {
        cursor: pointer;
      } 
    }

    &__title {
      font-size: 1.4em;
      font-weight: 600;
    }

  }

  .listing__thread-info {
    font-size: .9em;

    & * {
      padding: 0px 2px;
    }

    & a {
      color: hsla(206,100%,35%,1);
    }
  }

  .nsfw-label {
    background-color: #8d20ae;
    border-radius: 3px;
    color: white;
    font-size: .5em;
    padding: .25em;
    margin-left: .5em;
  }

  .subreddit-alert {
    min-height: 100vh;
    text-align: center;
    padding-top: 30px;

    &--buttons {
      margin-top: 1em;

      button {
        font-size: 1.5em;
        font-weight: 600;
        text-transform: uppercase;
        padding: .5em 3em;
        background-color: transparent;
        margin: 0px 1em;
        cursor: pointer;

        &:hover {
          color: white;
        }
      }
    }

    &--icon {
      font-size: 10em;
    }

    &--msg {
      font-size: 2em;
      font-weight: 600;
    }
  }
</style>
