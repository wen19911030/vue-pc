import Vue from 'vue';
import App from './App';
import router from './router';

console.log(process.env.NODE_ENV);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
