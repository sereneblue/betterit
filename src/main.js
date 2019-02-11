import Vue from "vue";
import moment from "moment";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter('abbr', function (num) {
	if (num === 0) { return '0'; } // terminate early
	let b = (num).toPrecision(2).split("e"), // get power
	  k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
	  c = k < 1 ? num.toFixed(0) : (num / Math.pow(10, k * 3) ).toFixed(1), // divide by power
	  d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
	  e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
	return e;
})

Vue.filter('since', function (unixTimestamp) {
  return moment(unixTimestamp * 1000).fromNow();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
