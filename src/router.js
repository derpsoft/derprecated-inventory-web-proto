/* eslint-disable no-unused-vars */
import VueRouter from 'vue-router';
import Main from './views/main.vue';
import Dashboard from './views/dashboard/dashboard.vue';

import ForgotPassword from './views/forgotPassword/forgotpassword.vue';
import Profile from './views/profile/profile.vue';
import Register from './views/register/register.vue';
import Login from './views/login/login.vue';
import Logout from './views/logout/logout.vue';

import Reports from './views/reports/reports.vue';

import Products from './views/products/products.vue';
import AddProduct from './views/addProduct/addProduct.vue';
import EditProduct from './views/editProduct/editProduct.vue';

import Warehouses from './views/warehouses/index.vue';
import EditWarehouse from './views/warehouses/edit.vue';
import AddWarehouse from './views/warehouses/add.vue';

import Users from './views/users/users.vue';
import EditUser from './views/modifyUser/modifyUser.vue';
// import AddUser from './views/modifyUser/modifyUser.vue';

import Categories from './views/categories/categories.vue';

import Vendors from './views/vendors/index.vue';
import AddVendor from './views/vendors/add.vue';
import EditVendor from './views/vendors/edit.vue';

// import NotFound from './views/notfound.vue';
import store from './stores/store';

const AddUser = EditUser; // temp

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
  meta: { requiresAuth: true },
  children: [{
    path: '',
    component: Dashboard,
    meta: { requiresAuth: true },
  }, {
    path: '/users',
    component: Users,
    meta: { requiresAuth: true },
  }, {
    path: '/users/add',
    component: AddUser,
    meta: { requiresAuth: true },
  }, {
    path: '/users/edit/:id',
    component: EditUser,
    meta: { requiresAuth: true },
  }, {
    path: '/categories',
    component: Categories,
    meta: { requiresAuth: true },
  }, {
    path: '/products',
    component: Products,
    meta: { requiresAuth: true },
  }, {
    path: '/products/add',
    component: AddProduct,
    meta: { requiresAuth: true },
  }, {
    path: '/products/edit/:id',
    component: EditProduct,
    meta: { requiresAuth: true },
  }, {
    path: '/warehouses',
    component: Warehouses,
    meta: { requiresAuth: true },
  }, {
    path: '/warehouses/add',
    component: AddWarehouse,
    meta: { requiresAuth: true },
  }, {
    path: '/warehouses/edit/:id',
    component: EditWarehouse,
    meta: { requiresAuth: true },
  }, {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true },
  }, {
    path: '/reports',
    component: Reports,
    meta: { requiresAuth: true },
  }, {
    path: '/vendors',
    component: Vendors,
    meta: { requiresAuth: true },
  }, {
    path: '/vendors/add',
    component: AddVendor,
    meta: { requiresAuth: true },
  }, {
    path: '/vendors/edit/:id',
    component: EditVendor,
    meta: { requiresAuth: true },
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
