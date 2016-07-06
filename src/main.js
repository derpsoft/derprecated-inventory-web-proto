import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './views/Main.vue';
import About from './views/About.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  hashbang: false,
});

router.redirect({
  '/': '/home',
});

router.map({
  '/home': {
    component: Main,
  },
  '/about': {
    component: About,
  },
});

// Declaring the app itself
const newapp = Vue.extend();

// Initializing the whole thing together
router.start(newapp, '#app');
