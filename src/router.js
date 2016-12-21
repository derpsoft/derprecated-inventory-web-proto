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
  auth: true,
  children: [{
    path: '',
    component: Dashboard,
  }, {
    path: '/users',
    component: Users,
  }, {
    path: '/users/add',
    component: AddUser,
  }, {
    path: '/users/edit/:id',
    component: EditUser,
  }, {
    path: '/categories',
    component: Categories,
  }, {
    path: '/products',
    component: Products,
  }, {
    path: '/products/add',
    component: AddProduct,
  }, {
    path: '/products/edit/:id',
    component: EditProduct,
  }, {
    path: '/warehouses',
    component: Warehouses,
  }, {
    path: '/warehouses/add',
    component: AddWarehouse,
  }, {
    path: '/warehouses/edit/:id',
    component: EditWarehouse,
  }, {
    path: '/profile',
    component: Profile,
  }, {
    path: '/reports',
    component: Reports,
  }, {
    path: '/vendors',
    component: Vendors,
  }, {
    path: '/vendors/add',
    component: AddVendor,
  }, {
    path: '/vendors/edit/:id',
    component: EditVendor,
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
