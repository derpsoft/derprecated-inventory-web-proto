/* eslint-disable no-unused-vars */
import VueRouter from 'vue-router';
import Main from './components/main.vue';
import Dashboard from './components/dashboard/index.vue';

import ForgotPassword from './components/forgotPassword/index.vue';
import Profile from './components/profile/index.vue';
import Register from './components/registration/index.vue';
import Login from './components/login/index.vue';
import Logout from './components/logout/index.vue';

import Reports from './components/reports/index.vue';
import Inventory from './components/inventory/index.vue';
import ReceiveInventory from './components/inventory/receiveInventory.vue';
import DispatchInventory from './components/inventory/dispatchInventory.vue';

import Products from './components/products/index.vue';
import ModifyProducts from './components/products/modifyProduct.vue';

import Warehouses from './components/warehouses/index.vue';
import ModifyWarehouses from './components/warehouses/modifyWarehouses.vue';

import Users from './components/users/index.vue';
import ModifyUsers from './components/users/modifyUser.vue';

import Categories from './components/categories/index.vue';

import Vendors from './components/vendors/index.vue';
import ModifyVendors from './components/vendors/modifyVendors.vue';

import Constants from './constants';
// import NotFound from './views/notfound.vue';
import store from './stores/store';

const Permissions = Constants.permissions;

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
  path: '/logout',
  component: Logout,
}, {
  path: '/',
  component: Main,
  meta: {
    requiresAuth: true
  },
  children: [{
    path: '',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users',
    component: Users,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users/add',
    component: ModifyUsers,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/users/edit/:id',
    component: ModifyUsers,
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
    path: '/products',
    component: Products,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/products/add',
    component: ModifyProducts,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/products/edit/:id',
    component: ModifyProducts,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/warehouses',
    component: Warehouses,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/warehouses/add',
    component: ModifyWarehouses,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/warehouses/edit/:id',
    component: ModifyWarehouses,
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
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/vendors/add',
    component: ModifyVendors,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/vendors/edit/:id',
    component: ModifyVendors,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/inventory',
    component: Inventory,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/inventory/receive',
    component: ReceiveInventory,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/inventory/dispatch',
    component: DispatchInventory,
    meta: {
      requiresAuth: true,
    }
  }]
}, {
  path: '*',
  redirect: '/'
}];

const router = new VueRouter({
  history: false,
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition || {
      x: 0,
      y: 0
    };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else if (to.path.toLowerCase() === '/login' && isAuthenticated) {
    next('/');
  }

  next();
});

store.watch(() => store.getters.isAuthenticated, (current) => {
  router.replace(current ? '/' : '/login');
});


module.exports = router;
