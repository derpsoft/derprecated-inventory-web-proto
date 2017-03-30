import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  sync
} from 'vuex-router-sync';
import VeeValidate from 'vee-validate';
import {
  Configuration
} from 'derp-api';
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

if (store.getters.isAuthenticated) {
  store.dispatch(Constants.GET_PROFILE);
}

Configuration.apiRoot = Constants.API_ROOT;
Configuration.token = store.getters.tokens.idToken;

store.watch(() => store.getters.tokens, ({
  idToken
}) => {
  Configuration.token = idToken;
});

/* eslint-disable no-new */
new Vue({
  name: 'derp',
  el: 'app',
  router,
  render: h => h(App)
});
