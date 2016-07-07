import Main from './views/Main.vue';
import About from './views/About.vue';

export function routing(router) {
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
}

module.exports = routing;
