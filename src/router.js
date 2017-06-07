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
import ModifyProducts from 'components/products/modify';

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
import OrderSummary from 'components/orders/summary';

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
  name: 'Login',
  component: Login,
}, {
  path: '/register',
  name: 'Register',
  component: Register,
}, {
  path: '/forgot-password',
  name: 'Forgot Password',
  component: ForgotPassword,
}, {
  path: '/reset-password/:email/:token',
  name: 'Reset Password',
  component: ResetPassword,
}, {
  path: '/logout',
  name: 'Logout',
  component: Logout,
}, {
  path: '/privacy-policy',
  name: 'Privacy Policy',
  component: PrivacyPolicy,
}, {
  path: '/not-found',
  name: 'Not Found',
  component: NotFound,
}, {
  path: '/not-authorized',
  name: 'Not Authorized',
  component: NotAuthorized,
}, {
  path: '/orders/summary/:orderKey/:orderNumber',
  name: 'Order Summary',
  component: OrderSummary,
}, {
  path: '/',
  name: 'Home',
  component: Main,
  children: [{
    path: '/dashboard',
    name: 'Dashboard',
    alias: '',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: guard('canReadUsers'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users/add',
    name: 'Add Users',
    component: ModifyUsers,
    beforeEnter: guard('canUpsertUsers'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users/edit/:id',
    name: 'Edit Users',
    component: ModifyUsers,
    beforeEnter: guard('canUpsertUsers'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/categories/add',
    name: 'Add Categories',
    component: ModifyCategories,
    beforeEnter: guard('canUpsertCategories'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/categories',
        name: 'Categories'
      }
    },
  }, {
    path: '/categories/edit/:id',
    name: 'Modify Categories',
    component: ModifyCategories,
    beforeEnter: guard('canUpsertCategories'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/categories',
        name: 'Categories'
      },
    },
  }, {
    path: '/products',
    name: 'Products',
    component: Products,
    beforeEnter: guard('canReadProducts'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/products/add',
    name: 'Add Products',
    component: ModifyProducts,
    beforeEnter: guard('canUpsertProducts'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/products',
        name: 'Products'
      },
    },
  }, {
    path: '/products/edit/:id',
    name: 'Edit Products',
    component: ModifyProducts,
    beforeEnter: guard('canUpsertProducts'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/products',
        name: 'Products'
      },
    },
  }, {
    path: '/products/import',
    name: 'Import Products',
    component: ModifyProducts,
    beforeEnter: guard('canUpsertProducts'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/products',
        name: 'Products'
      },
    },
  }, {
    path: '/images',
    name: 'Images',
    component: Images,
    beforeEnter: guard('canReadImages'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/images/edit/:id',
    name: 'Edit Images',
    component: ModifyImages,
    beforeEnter: guard('canUpsertImages'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/images',
        name: 'Images'
      },
    },
  }, {
    path: '/warehouses',
    name: 'Warehouses',
    component: Warehouses,
    beforeEnter: guard('canReadWarehouses'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/warehouses',
        name: 'Warehouses'
      },
    },
  }, {
    path: '/warehouses/add',
    name: 'Add Warehouses',
    component: ModifyWarehouses,
    beforeEnter: guard('canUpsertWarehouses'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/warehouses',
        name: 'Warehouses'
      },
    },
  }, {
    path: '/warehouses/edit/:id',
    name: 'Edit Warehouses',
    component: ModifyWarehouses,
    beforeEnter: guard('canUpsertWarehouses'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/warehouses',
        name: 'Warehouses'
      },
    },
  }, {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/vendors',
    name: 'Vendors',
    component: Vendors,
    beforeEnter: guard('canReadVendors'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/vendors/add',
    name: 'Add Vendors',
    component: ModifyVendors,
    beforeEnter: guard('canUpsertVendors'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/vendors',
        name: 'Vendors'
      },
    },
  }, {
    path: '/vendors/edit/:id',
    name: 'Edit Vendors',
    component: ModifyVendors,
    beforeEnter: guard('canUpsertVendors'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/vendors',
        name: 'Vendors'
      },
    },
  }, {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory,
    meta: {
      requiresAuth: true,
      parent: {
        path: '/inventory',
        name: 'Inventory'
      },
    }
  }, {
    path: '/inventory/dashboard',
    name: 'Inventory Dashboard',
    component: InventoryDashboard,
    meta: {
      requiresAuth: true,
      parent: {
        path: '/inventory',
        name: 'Inventory'
      },
    }
  }, {
    path: '/inventory/receive',
    name: 'Receive Inventory',
    component: ModifyInventory,
    beforeEnter: guard('canReceiveInventory'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/inventory',
        name: 'Inventory'
      },
    }
  }, {
    path: '/inventory/import',
    name: 'Import Inventory',
    component: ModifyInventory,
    beforeEnter: guard('canReceiveInventory'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/inventory',
        name: 'Inventory'
      },
    }
  }, {
    path: '/inventory/dispatch',
    name: 'Dispatch Inventory',
    component: ModifyInventory,
    beforeEnter: guard('canDispatchInventory'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/inventory',
        name: 'Inventory'
      },
    }
  }, {
    path: '/locations',
    name: 'Locations',
    component: Locations,
    beforeEnter: guard('canReadLocations'),
    meta: {
      requiresAuth: true
    },
  }, {
    path: '/locations/add',
    name: 'Add Locations',
    component: ModifyLocation,
    beforeEnter: guard('canUpsertLocations'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/locations',
        name: 'Locations'
      },
    },
  }, {
    path: '/locations/edit/:id',
    name: 'Edit Locations',
    component: ModifyLocation,
    beforeEnter: guard('canUpsertLocations'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/locations',
        name: 'Locations'
      },
    },
  }, {
    path: '/sales',
    alias: '/sales/dashboard',
    name: 'Sales',
    component: SalesDashboard,
    beforeEnter: guard('canReadSales'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: guard('canManageOrders'),
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/orders/add',
    name: 'Add Orders',
    component: ModifyOrders,
    beforeEnter: guard('canManageOrders'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/orders',
        name: 'Orders'
      },
    },
  }, {
    path: '/orders/edit/:id',
    name: 'Edit Orders',
    component: ModifyOrders,
    beforeEnter: guard('canManageOrders'),
    meta: {
      requiresAuth: true,
      parent: {
        path: '/orders',
        name: 'Orders'
      },
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
  linkActiveClass: 'open active',
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition || {
      x: 0,
      y: 0
    };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    router.replace('/login');
  }
  next();
});

store.watch(() => store.getters.isAuthenticated, (current, previous) => {
  if (current !== previous) {
    router.replace(current ? '/' : '/login');
  }
});

module.exports = router;
