<template>
  <span>
    <nav>
      <ul v-if="loaded">
        <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'hot' }}" class="active" tag="li">r/{{ sub }}</router-link>
        <span>|</span>
        <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'new' }}" active-class="active" tag="li">new</router-link>
        <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'rising' }}" active-class="active" tag="li">rising</router-link>
        <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'controversial' }}" active-class="active" tag="li">controversial</router-link>
        <router-link :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'top' }}" active-class="active" tag="li">top</router-link>
        <span>|</span>
        <li @click="toggleMenu">⌘</li>
      </ul>
      <ul v-else>
        <li v-if="!error">Loading...</li>
        <router-link v-else :to="{ name: 'subreddit', params: { subreddit: 'popular', sort: 'hot' }}" class="active" tag="li"><= go to popular</router-link>
      </ul>
    </nav>
    <transition name="slide-fade">
      <div v-show="showMenu" class="dropmenu">
        <div class="container">
          <center>
            <label @click.self="changeTheme">
              <input @click.stop type="checkbox" id="darkThemeEnabled">Enable Dark Theme
            </label>
          </center>
          <h3>Subreddits</h3>
          <div class="subreddits">
          </div>
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
import DeleteIcon from 'vue-ionicons/dist/md-trash.vue'

export default {
  name: "navbar",
  components: {
    DeleteIcon
  },
  computed: {
    error () {
      return this.$store.state.error;
    },
    showMenu () {
      return this.$store.state.showMenu;
    },
    sub () {
      return this.$store.state.subreddit;
    },
    theme () {
      return this.$store.state.theme;
    },
    loaded () {
      return this.$route.name == "thread" ? 
             this.$store.state.threadLoaded : this.$store.state.listingsLoaded;
    }
  },
  methods: {
    changeTheme: function () {
      document.getElementById('darkThemeEnabled').checked = this.theme == 'dark';
      this.$store.dispatch('changeTheme');
    },
    toggleMenu: function() {
      this.$store.dispatch('toggleMenu');
    }
  },
  mounted: function () {
    document.getElementById('darkThemeEnabled').checked = this.theme == 'dark';
  },
};
</script>

<style scoped lang="scss">
  label {
    cursor: pointer;
  }

  nav {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    position: fixed;
    width: 100%;
    z-index: 2;

    & ul {
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      font-weight: 600;

      li {
        list-style-type: none;
        padding: 0px 10px;
        text-align: center;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .dropmenu {
    position: fixed;
    width: 100%;
    margin-top: 30px;
    padding: 10px 0px;
    z-index: 2;

    & .container {
      width: 80%;
      margin: 0 auto;

      & input {
        margin-right: 5px;
      }

      & h3 {
        text-align: center;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  .subreddits {
    margin: 0 auto;
  }

  .sub {
    float: left;
    font-weight: 600;
    padding: 5px;
    width: 30%;
    margin: 3px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.1);

    &__name:hover {
      color: white;
      cursor: pointer;
    }

    &__delete {
      background-color: rgba(black, 0.1);
      border-radius: 3px;
      cursor: pointer;
      padding: 0px 2px;
      float: right;
      position: relative;
      top: 2px;
    }
  }
</style>
