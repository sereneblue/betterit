<template>
  <span>
    <nav>
      <ul v-if="loaded">
        <router-link
          :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'hot' } }"
          class="active"
          tag="li"
          >r/{{ sub }}</router-link
        >
        <span>|</span>
        <router-link
          :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'new' } }"
          active-class="active"
          tag="li"
          >new</router-link
        >
        <router-link
          :to="{
            name: 'subreddit',
            params: { subreddit: sub, sort: 'rising' }
          }"
          active-class="active"
          tag="li"
          >rising</router-link
        >
        <router-link
          :to="{
            name: 'subreddit',
            params: { subreddit: sub, sort: 'controversial' }
          }"
          active-class="active"
          tag="li"
          >controversial</router-link
        >
        <router-link
          :to="{ name: 'subreddit', params: { subreddit: sub, sort: 'top' } }"
          active-class="active"
          tag="li"
          >top</router-link
        >
        <span>|</span>
        <li @click="toggleMenu">⌘</li>
      </ul>
      <ul v-else>
        <li v-if="!error">Loading...</li>
        <router-link
          v-else
          :to="{
            name: 'subreddit',
            params: { subreddit: 'popular', sort: 'hot' }
          }"
          class="active"
          tag="li"
          ><= go to popular</router-link
        >
      </ul>
    </nav>
    <transition name="slide-fade">
      <div v-show="showMenu" v-click-outside="hide" class="dropmenu">
        <div class="container">
          <center>
            <input
              @click="changeTheme"
              type="checkbox"
              id="darkThemeEnabled"
            />Enable Dark Theme
          </center>
          <center>
            <input
              @click="updateSubreddits"
              type="checkbox"
              id="updateSubs"
            />Add to subreddit list
          </center>
          <h3>Subreddits</h3>
          <div class="subreddits">
            <div v-for="s in subs" class="subreddit">
              <router-link
                :to="{ name: 'subreddit', params: { subreddit: s } }"
                class="subreddit__name"
                tag="span"
                >r/{{ s }}</router-link
              >
              <span @click="removeSub(s)" class="subreddit__delete"
                ><DeleteIcon
              /></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
import DeleteIcon from "vue-ionicons/dist/md-trash.vue";

export default {
  name: "Navbar",
  components: {
    DeleteIcon
  },
  data: function() {
    return {
      delay: false,
      subs: []
    };
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    showMenu() {
      return this.$store.state.showMenu;
    },
    sub() {
      return this.$store.state.subreddit;
    },
    theme() {
      return this.$store.state.theme;
    },
    loaded() {
      return this.$route.name == "thread"
        ? this.$store.state.threadLoaded
        : this.$store.state.listingsLoaded;
    }
  },
  methods: {
    changeTheme: function() {
      this.$store.dispatch("changeTheme");
      document.getElementById("darkThemeEnabled").checked =
        this.theme == "dark";
      localStorage.setItem("theme", this.theme);
    },
    hide: function(event) {
      if (this.showMenu) {
        if (this.delay) {
          this.$store.dispatch("toggleMenu");
        }

        this.delay = !this.delay;
      }
    },
    removeSub: function(sub) {
      this.subs = this.subs.filter(s => s !== sub);
      localStorage.setItem("subreddits", JSON.stringify(this.subs));
    },
    toggleMenu: function() {
      this.$store.dispatch("toggleMenu");
    },
    updateSubreddits: function(e) {
      if (this.subs.length) {
        let found = this.subs.findIndex(s => s == this.sub);
        if (found > -1) {
          this.subs = this.subs.filter(s => s !== this.sub);
        } else {
          this.subs.push(this.sub);
        }
      } else {
        this.subs.push(this.sub);
      }

      localStorage.setItem("subreddits", JSON.stringify(this.subs));
    }
  },
  mounted: function() {
    this.subs = JSON.parse(localStorage.getItem("subreddits")) || [];

    document.getElementById("darkThemeEnabled").checked = this.theme == "dark";
  },
  watch: {
    sub: function(newSub, oldSub) {
      document.getElementById("updateSubs").checked =
        this.subs.findIndex(s => s == newSub) > -1 ? true : false;
    }
  }
};
</script>

<style scoped lang="scss">
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
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.subreddits {
  margin: 0 auto;
}

.subreddit {
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
