/* eslint-disable no-unused-vars */
import VueRouter from 'vue-router';
import Main from 'components/main';
import Dashboard from 'components/dashboard/index';
import NotFound from 'components/errors/notFound';
import NotAuthorized from 'components/errors/notAuthorized';
import PrivacyPolicy from 'components/legal/privacy';

import ForgotPassword from 'components/password/forgot';
import ResetPassword from 'components/password/reset';

import Profile from 'components/profile/index';
import Register from 'components/registration/index';
import Login from 'components/login/index';
import Logout from 'components/logout/index';

import Reports from 'components/reports/index';

import Inventory from 'components/inventory/index';
import InventoryDashboard from 'components/inventory/dashboard';
import ModifyInventory from 'components/inventory/modify';

import Products from 'components/products/index';
import ModifyProducts from 'components/products/modifyProduct';

import Images from 'components/images/index';
import ModifyImages from 'components/images/modify';

import Warehouses from 'components/warehouses/index';
import ModifyWarehouses from 'components/warehouses/modifyWarehouses';

import Locations from 'components/locations/index';
import ModifyLocation from 'components/locations/modify';

import Users from 'components/users/index';
import ModifyUsers from 'components/users/modifyUser';

import Categories from 'components/categories/index';
import ModifyCategories from 'components/categories/modify';

import Vendors from 'components/vendors/index';
import ModifyVendors from 'components/vendors/modifyVendors';

import Sales from 'components/sales/index';
import SalesDashboard from 'components/sales/dashboard';

import Orders from 'components/orders/index';
import ModifyOrders from 'components/orders/modify';

import Constants from './constants';
// import NotFound from './views/notfound';
import store from './stores/store';

const Permissions = Constants.permissions;

const guard = (g) => {
  return (to, from, next) => {
    if (store.getters[g]) {
      return next();
    }
    // do something to tell the user that they're not allowed;
    return next('/not-found');
  };
};

const routes = [{
  path: '/login',
  component: Login,
}, {
  path: '/register',
  component: Register,
}, {
  path: '/forgot-password',
  component: ForgotPassword,
}, {
  path: '/reset-password/:email/:token',
  component: ResetPassword,
}, {
  path: '/logout',
  component: Logout,
}, {
  path: '/privacy-policy',
  component: PrivacyPolicy,
}, {
  path: '/not-found',
  component: NotFound,
}, {
  path: '/not-authorized',
  component: NotAuthorized,
}, {
  path: '/',
  component: Main,
  children: [{
    path: '/dashboard',
    alias: '',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users',
    component: Users,
    beforeEnter: guard('canReadUsers'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users/add',
    component: ModifyUsers,
    beforeEnter: guard('canUpsertUsers'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users/edit/:id',
    component: ModifyUsers,
    beforeEnter: guard('canUpsertUsers'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/categories',
    component: Categories,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/categories/add',
    component: ModifyCategories,
    beforeEnter: guard('canUpsertCategories'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/categories/edit/:id',
    component: ModifyCategories,
    beforeEnter: guard('canUpsertCategories'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/products',
    component: Products,
    beforeEnter: guard('canReadProducts'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/products/add',
    component: ModifyProducts,
    beforeEnter: guard('canUpsertProducts'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/products/edit/:id',
    component: ModifyProducts,
    beforeEnter: guard('canUpsertProducts'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/products/import',
    component: ModifyProducts,
    beforeEnter: guard('canUpsertProducts'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/images',
    component: Images,
    beforeEnter: guard('canReadImages'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/images/edit/:id',
    component: ModifyImages,
    beforeEnter: guard('canUpsertImages'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/warehouses',
    component: Warehouses,
    beforeEnter: guard('canReadWarehouses'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/warehouses/add',
    component: ModifyWarehouses,
    beforeEnter: guard('canUpsertWarehouses'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/warehouses/edit/:id',
    component: ModifyWarehouses,
    beforeEnter: guard('canUpsertWarehouses'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/reports',
    component: Reports,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/vendors',
    component: Vendors,
    beforeEnter: guard('canReadVendors'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/vendors/add',
    component: ModifyVendors,
    beforeEnter: guard('canUpsertVendors'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/vendors/edit/:id',
    component: ModifyVendors,
    beforeEnter: guard('canUpsertVendors'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/inventory',
    alias: '/inventory/dashboard',
    component: InventoryDashboard,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/inventory/receive',
    component: ModifyInventory,
    beforeEnter: guard('canReceiveInventory'),
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/inventory/import',
    component: ModifyInventory,
    beforeEnter: guard('canReceiveInventory'),
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/inventory/dispatch',
    component: ModifyInventory,
    beforeEnter: guard('canDispatchInventory'),
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/locations',
    component: Locations,
    beforeEnter: guard('canReadLocations'),
    meta: {
      requiresAuth: true
    },
  }, {
    path: '/locations/add',
    component: ModifyLocation,
    beforeEnter: guard('canUpsertLocations'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/locations/edit/:id',
    component: ModifyLocation,
    beforeEnter: guard('canUpsertLocations'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/sales',
    alias: '/sales/dashboard',
    component: SalesDashboard,
    beforeEnter: guard('canReadSales'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/orders',
    component: Orders,
    beforeEnter: guard('canManageOrders'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/orders/add',
    component: ModifyOrders,
    beforeEnter: guard('canManageOrders'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/orders/edit/:id',
    component: ModifyOrders,
    beforeEnter: guard('canManageOrders'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '*',
    component: NotFound,
    beforeEnter(to, from, next) {
      next('/not-found');
    }
  }],
}];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition || {
      x: 0,
      y: 0
    };
  },
  routes,
});

store.watch(() => store.getters.isAuthenticated, (current, previous) => {
  if (current !== previous) {
    router.replace(current ? '/' : '/login');
  }
});

module.exports = router;
