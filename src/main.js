import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  sync
} from 'vuex-router-sync';
import VeeValidate from 'vee-validate';
import store from 'stores/store';
import Constants from 'src/constants';
import App from 'components/app';
import Directives from 'directives';
import Mixins from 'mixins';
import router from 'src/router';

const vvConfig = {
  fieldsBagName: '',
};

Vue.use(VueRouter);
Vue.use(VeeValidate, vvConfig);

Vue.config.keyCodes.backspace = 8;
Vue.config.keyCodes.space = 32;

sync(store, router);

Directives.map(d => d(Vue));
Mixins.map(x => x(Vue));

/* eslint-disable no-new */
new Vue({
  name: 'derp',
  el: 'app',
  router,
  render: h => h(App)
});

if (store.getters.isAuthenticated) {
  store.dispatch(Constants.GET_PROFILE);
}
