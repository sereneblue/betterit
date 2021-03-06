<template>
  <div id="app" :class="currentTheme">
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      currentTheme: function () {
        return this.$store.state.theme;
      }
    },
    mounted: function() {
      let theme = localStorage.getItem("theme");

      if (theme && this.currentTheme != theme) {
        this.$store.dispatch('changeTheme');
      }

      localStorage.setItem("theme", this.currentTheme);
    },
    watch: {
      $route (to, from){
        this.$store.dispatch('clearState');

        if (this.$store.state.showMenu) {
          this.$store.dispatch('toggleMenu');
        }
        
        if (to.name == "subreddit") {
          this.$router.push({ name: to.name, params: to.params });
        } else if (to.name == "thread") {
          this.$router.push({ name: to.name, params: to.params });
        }
      }
    } 
  }
</script>

<style lang="scss">
  @import '@/assets/_colors.scss';

	* {
		margin: 0;
		padding: 0;
	}

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: normal;
  }

  code {
    font-family: 'Source Code Pro';
    background: rgba(238, 238, 238, 0.8) none repeat scroll 0% 0%;
    color: rgb(255, 0, 109);
    margin: 10px 0px;
    padding: 3px;
    overflow: auto;
    max-width: 100%;
  }

  #app {
    min-height: 100vh;

    @each $theme in (light dark) {
      &.#{$theme} {
        background-color: color($theme, bg);
        color: color($theme, fg);

        & blockquote {
          position: relative;
          background: rgba(color($theme, shade-1), 0.1);
          border-left: 5px solid color($theme, link);
          padding: .5em 30px .5em 50px;
          margin: .5em 0em;
          font-size: 1em;
          font-style: italic;
          line-height: 1.5;

          &::before {
            font-family: Arial;
            content: "\201C";
            color: color($theme, link);
            font-size: 3em;
            position: absolute;
            left: 10px;
            top: -10px;
          }

          &::after {
            content: '';
          }
        }

        & pre {
          background-color: color($theme, fg);
          padding: 10px;
          margin: 10px 0px;

          & > code {
            background: none;
            color: color($theme, bg);
          }
        }

        & .comment {
          box-shadow: inset 2px 2px 0px 0px color($theme, ui);
        
          &__info-meta--author.op {
            color: color($theme, link);
          }

          &__toggle.toggled {
            color: color($theme, shade-1);
          }
        }

        & .media__type {
          background-color: rgba(color($theme, ui), .5);
        }

        & .listing {
          &__thread {
            border-left:inset 4px color($theme, link);

            &:hover {
              background-color: rgba(color($theme, ui), .35);
            }
          }
        }

        & .subreddit-alert {
          button {
            border: 3px solid color($theme, ui);
            color: color($theme, ui);

            &:hover {
              color: color($theme, bg);
              background-color: color($theme, ui);
            }
          }
        }

        & .thread {
          &__content {
            border-top: 2px solid color($theme, fg);
            border-bottom: 2px solid color($theme, fg);
          }

          &__info--domain {
            color: color($theme, shade-1);
          }
        }

        & nav {
          background-color: color($theme, ui);

          & li {
            color: color($theme, shade-1);

            &:hover {
              color: color($theme, shade-2);
            }

            &.active {
              color: color($theme, shade-3);
            }
          }
        }

        & a {
          color: color($theme, link);
        }

        & .dropmenu {
          background-color: color($theme, ui);
        }

        & .sk-folding-cube .sk-cube:before {
          background-color: color($theme, ui);
        }
      }
    }

    & > div {
      margin: 0 auto;
      width: 80%;
    }
  }
</style>
