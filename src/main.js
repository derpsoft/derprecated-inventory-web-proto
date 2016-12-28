import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Toastr from 'vue-toastr';
import {
  sync
} from 'vuex-router-sync';
import store from './stores/store';
import App from './components/app.vue';
import Constants from './constants';
import router from './router';

Vue.use(VueRouter);
Vue.use(VueResource);

sync(store, router);

Vue.component('vue-toastr', Toastr);

/* eslint-disable no-new */
new Vue({
  name: 'derp',
  el: 'app',
  router,
  render: h => h(App)
});

store.dispatch(Constants.GET_PROFILE);
