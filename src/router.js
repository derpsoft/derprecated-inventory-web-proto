import Layout from './views/app.vue';
import Dashboard from './views/dashboard/dashboard.vue';
import Inventory from './views/inventory/inventory.vue';
import Logistics from './views/Logistics/logistics.vue';

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
  });
}

module.exports = routing;
