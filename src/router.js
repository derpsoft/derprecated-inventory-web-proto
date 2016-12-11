import Main from './views/main.vue';
import Dashboard from './views/dashboard/dashboard.vue';
import Products from './views/products/products.vue';
import AddProduct from './views/addProduct/addProduct.vue';
import EditProduct from './views/editProduct/editProduct.vue';
import WareHouses from './views/warehouses/warehouses.vue';
import Profile from './views/profile/profile.vue';
import Reports from './views/reports/reports.vue';
import Register from './views/register/register.vue';
import Login from './views/login/login.vue';
import Logout from './views/logout/logout.vue';
import Users from './views/users/users.vue';
import ModifyUser from './views/modifyUser/modifyUser.vue';
import Categories from './views/categories/categories.vue';
import ForgotPassword from './views/forgotPassword/forgotpassword.vue';
// import NotFound from './views/notfound.vue';
import store from './stores/store';

export function routing(router) {
  router.map({
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
      subRoutes: {
        '/': {
          component: Dashboard,
        },
        '/users': {
          component: Users,
        },
        '/users/add': {
          component: ModifyUser,
        },
        '/users/edit/:id': {
          component: ModifyUser,
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
          component: WareHouses,
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
      component: Main,
    },
  });

  router.beforeEach((transition) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (transition.to.auth && !isAuthenticated) {
      transition.redirect('/login');
    } else if (transition.to.path.toLowerCase() === '/login' && isAuthenticated) {
      transition.redirect('/');
    }

    transition.next();
  });

  store.watch(() => store.getters.isAuthenticated, (current) => {
    router.replace(current ? '/' : '/login');
  });
}

module.exports = routing;
