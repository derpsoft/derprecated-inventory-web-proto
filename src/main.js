import Vue from 'vue';
import App from 'App';
import Hello from './components/Hello';
import Test from './components/Test';
// import Signup from './components/Signup.vue'
// import Login from './components/Login.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter();

// Set up routing and match routes to components
router.map({
  '/home': {
    component: Hello,
  },
  '/test': {
    component: Test,
  },
});

// Redirect to the home route if any routes are unmatched
router.redirect({
  '*': '/home',
});

// Start the app on the #app div
router.start(App, '#app');
