import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import {
  sync
} from 'vuex-router-sync';
import store from './stores/store';
import App from './components/app.vue';

import router from './router';

Vue.use(VueRouter);
Vue.use(VueResource);

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  render: h => h(App)
});
