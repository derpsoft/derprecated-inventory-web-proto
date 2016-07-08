import Vue from 'vue';
import VueRouter from 'vue-router';
import Progress from 'vue-progressbar';
import Main from './views/app.vue';

Vue.use(VueRouter);
Vue.use(Progress);

const router = new VueRouter({
  hashbang: false,
});

require('./router')(router);

const App = Vue.extend(Main);

// Initializing the whole thing together
router.start(App, 'app');
