import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  sync
} from 'vuex-router-sync';
import VeeValidate from 'vee-validate';
import Toastr from 'vue-toastr';
import store from './stores/store';
import App from './components/app.vue';
import Directives from './directives';
import router from './router';
import Constants from './constants';

const vvConfig = {
  fieldsBagName: '',
};

Vue.use(VueRouter);
Vue.use(VeeValidate, vvConfig);
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
