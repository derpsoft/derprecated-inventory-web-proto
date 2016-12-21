import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Progress from 'vue-progressbar';
import {
  sync
} from 'vuex-router-sync';
import store from './stores/store';
import App from './views/app.vue';
import Constants from './constants';

import router from './router';

Vue.use(VueRouter);
Vue.use(Progress);
Vue.use(VueResource);

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  render: h => h(App)
});

store.dispatch(Constants.GET_PROFILE);
