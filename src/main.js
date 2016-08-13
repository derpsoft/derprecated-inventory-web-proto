import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Progress from 'vue-progressbar';
// import VueX from 'vuex';
import App from './views/app.vue';

Vue.use(VueRouter);
Vue.use(Progress);
// Vue.use(VueX);

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
});

require('./router')(router);

Vue.use(VueResource);

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
