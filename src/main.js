import Vue from 'vue';
// import App from './App';
// import Hello from './components/Hello';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
  hashbang: false,
});

const Home = Vue.extend({
  template: '<div>Home <br>' +
            ' <a href="javascript:void(0);" v-link="{ path: \'/about\' }">About me</a></div>',
});

const About = Vue.extend({
  template: '<div>About Me <br>' +
            ' <a href="javascript:void(0);" v-link="{ path:  \'/home\' }">go home</a></div>',
});

router.redirect({
  '/': '/home',
});

router.map({
  '/home': {
    component: Home,
  },
  '/about': {
    component: About,
  },
});

// /* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App },
// });

// Declaring the app itself
const newapp = Vue.extend();

// Initializing the whole thing together
router.start(newapp, '#app');
