<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script type="text/javascript">
  window.onhashchange = function() {
      window.location.reload()
  }

  let navigate = (subreddit, comment) => {
    window.location = comment ? `#/r/${subreddit}/${comment}` : `#/r/${subreddit}`; 
  }
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}
</style>
