<template>
  <div id="app">
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script type="text/javascript">
  export default {
    watch: {
      $route (to, from){
        this.$store.dispatch('clearState');

        if (to.name == "subreddit") {
          this.$store.dispatch(
            'getListings',
            to.params
          );
          this.$router.push({ name: to.name, params: to.params });
        } else if (to.name == "thread") {
          this.$store.dispatch(
            'getComments',
            to.params
          );
          this.$router.push({ name: to.name, params: to.params });
        }
      }
    } 
  }
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}

  body {
    background-color: lightgrey;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: normal;
  }

  code {
      font-family: 'Noto Mono, Menlo, Monaco, Consolas';
      line-height: 20px;
      background: rgba(238, 238, 238, 0.8) none repeat scroll 0% 0%;
      color: rgb(255, 0, 109);
      margin: 0px 2px;
      max-width: 100%;
      overflow: auto;
  }

  #app > div {
    margin: 0 auto;
    width: 80%;
  }
</style>
