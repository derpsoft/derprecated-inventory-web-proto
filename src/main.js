import Vue from 'vue';
import store from './stores/store.js';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Progress from 'vue-progressbar';
import {
  sync
} from 'vuex-router-sync';

Vue.use(VueRouter);
Vue.use(Progress);
Vue.use(VueResource);

import App from './views/app.vue';
import Constants from './constants';

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
});

require('./router')(router);

sync(store, router);

Vue.http.interceptors.push({
  request(request) {
    /*
      Enable this when you have a backend that you authenticate against
    var headers = request.headers
    if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
      headers.Authorization = this.$store.state.token
    }
    */
    // console.log(headers)
    return request;
  },
  response(response) {
    return response;
  },
});

const app = Vue.extend(App);

// Initializing the whole thing together
router.start(app, 'app');

store.dispatch(Constants.GET_USER);
