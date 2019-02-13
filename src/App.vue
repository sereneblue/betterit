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
</style>
