import Vue from 'vue';
import VueRouter from 'vue-router';
import Toastr from 'vue-toastr';
import {
  sync
} from 'vuex-router-sync';
import store from './stores/store';
import App from './components/app.vue';
import Directives from './directives';
import router from './router';

Vue.use(VueRouter);

sync(store, router);

Vue.component('vue-toastr', Toastr);

Directives.map(d => d(Vue));

/* eslint-disable no-new */
new Vue({
  name: 'derp',
  el: 'app',
  router,
  render: h => h(App)
});
