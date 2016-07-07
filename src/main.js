import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  hashbang: false,
});

require('./router')(router);

// Declaring the app itself
const derpInventoryWeb = Vue.extend();

// Initializing the whole thing together
router.start(derpInventoryWeb, '#app');
