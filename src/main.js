import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  sync
} from 'vuex-router-sync';
import Toastr from 'vue-toastr';
import store from './stores/store';
import App from './components/app.vue';
import Directives from './directives';
import router from './router';
import Constants from './constants';

Vue.use(VueRouter);
Vue.use(Toastr);

sync(store, router);

Directives.map(d => d(Vue));

/* eslint-disable no-new */
new Vue({
  name: 'derp',
  el: 'app',
  router,
  render: h => h(App)
});

store.dispatch(Constants.GET_PROFILE);
