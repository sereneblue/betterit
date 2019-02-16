<template>
  <div id="app">
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}

  body {
    background-color: lightgrey;
  }

  #app {
    margin: 0 auto;
    width: 80%;
  }
</style>
