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

  #app {
    margin: 0 auto;
    width: 80%;
  }
</style>
