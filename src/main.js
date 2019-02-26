import Vue from "vue";
import moment from "moment";
import App from "./App.vue";
import Comment from "@/components/Comment.vue";
import NavBar from "@/components/NavBar.vue";
import router from "./router";
import store from "./store";
require('typeface-open-sans');
require('typeface-source-code-pro');
require('vue-ionicons/ionicons.css');

Vue.config.productionTip = false;

Vue.component('Reply', Comment);
Vue.component('NavBar', NavBar);

Vue.filter('abbr', function (num) {
  if (num === 0 || num === undefined ) { return '0'; }
  let b = (num).toPrecision(2).split("e"),
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
    c = k < 1 ? num.toFixed(0) : (num / Math.pow(10, k * 3) ).toFixed(1),
    d = c < 0 ? c : Math.abs(c),
    e = d + ['', 'k', 'm', 'b', 't'][k];
  return e;
})

Vue.filter('since', function (unixTimestamp) {
  return moment(unixTimestamp * 1000).fromNow();
})

Vue.filter('clean', function (text) {
  let txt = document.createElement("textarea");
  txt.innerHTML = text;

  // fix links
  let cleanedText = txt.value;

  cleanedText = cleanedText.replace(/href="\/?(r\/[^\s/]+)\/?"/g, `href="/#/$1"`);
  cleanedText = cleanedText.replace(/<a href="\/?(u\/.*?)\/?">.*?<\/a>/g, `/$1`);
  cleanedText = cleanedText.replace(/<a href="https:\/\/www.reddit.com\/(u\/.*?)\/?>.*?<\/a>/g, `/$1`);
  cleanedText = cleanedText.replace(/https:\/\/(www|old).reddit.com\/(r\/[^\s/]+\/?)\/comments\/(.*?)\/.*?\//g, `${window.location.origin}${window.location.pathname}/#/$2/t/$3`);
  cleanedText = cleanedText.replace(/<a href=("\/message\.*?)">/, `#/dne`);

  return cleanedText;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
