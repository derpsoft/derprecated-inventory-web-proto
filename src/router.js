import Layout from './views/app.vue';
import Dashboard from './views/dashboard/dashboard.vue';
import Inventory from './views/inventory/inventory.vue';
import Logistics from './views/logistics/logistics.vue';
import Profile from './views/profile/profile.vue';

export function routing(router) {
  router.redirect({
    '/': '/dashboard',
  });

  router.map({
    '/': {
      component: Layout,
    },
    '/dashboard': {
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
  });
}

module.exports = routing;
