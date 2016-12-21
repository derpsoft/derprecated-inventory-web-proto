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

export default function routing(router) {
  router.routes = [{
    '/login': {
      component: Login,
    },
    '/register': {
      component: Register,
    },
    '/forgot-password': {
      component: ForgotPassword,
    },
    '/logout': {
      component: Logout,
    },
    '/': {
      component: Main,
      auth: true,
      children: {
        '': {
          component: Dashboard,
        },
        '/users': {
          component: Users,
        },
        '/users/add': {
          component: AddUser,
        },
        '/users/edit/:id': {
          component: EditUser,
        },
        '/categories': {
          component: Categories,
        },
        '/products': {
          component: Products,
        },
        '/products/add': {
          component: AddProduct,
        },
        '/products/edit/:id': {
          component: EditProduct,
        },
        '/warehouses': {
          component: Warehouses,
        },
        '/warehouses/add': {
          component: AddWarehouse,
        },
        '/warehouses/edit/:id': {
          component: EditWarehouse,
        },
        '/profile': {
          component: Profile,
        },
        '/reports': {
          component: Reports,
        },
        '/vendors': {
          component: Vendors,
        },
        '/vendors/add': {
          component: AddVendor,
        },
        '/vendors/edit/:id': {
          component: EditVendor,
        }
      },
    },
    '*': {
      redirect: '/'
    },
  }];

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
}

module.exports = routing;
