import Main from './views/main.vue';
import Dashboard from './views/dashboard/dashboard.vue';
import Inventory from './views/inventory/inventory.vue';
import Logistics from './views/logistics/logistics.vue';
import Profile from './views/profile/profile.vue';
import Reports from './views/reports/reports.vue';
import Register from './views/register/register.vue';
import Login from './views/login/login.vue';
import NotFound from './views/notfound.vue';

export function routing(router) {
  router.map({
    '/login': {
      component: Login,
    },
    '/register': {
      component: Register,
    },
    '/': {
      component: Main,
      auth: true,
      subRoutes: {
        '': {
          component: Dashboard,
        },
        '/inventory': {
          component: Inventory,
        },
        '/logistics': {
          component: Logistics,
        },
        '/profile': {
          component: Profile,
        },
        '/reports': {
          component: Reports,
        },
      },
    },
    '*': {
      component: NotFound,
    },
  });

  router.beforeEach((transition) => {
    if (transition.to.auth && (transition.to.router.app.$store.state.token === 'null')) {
      window.console.log('Not authenticated');
      transition.redirect('/login');
    } else {
      transition.next();
    }
  });
}

module.exports = routing;
