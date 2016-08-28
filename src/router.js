import Main from './views/main.vue';
import Dashboard from './views/dashboard/dashboard.vue';
import Products from './views/products/products.vue';
import AddProducts from './views/addProduct/addProduct.vue';
import WareHouses from './views/warehouses/warehouses.vue';
import Profile from './views/profile/profile.vue';
import Reports from './views/reports/reports.vue';
import Register from './views/register/register.vue';
import Login from './views/login/login.vue';
import Logout from './views/logout/logout.vue';
import Users from './views/users/users.vue';
import ForgotPassword from './views/forgotPassword/forgotpassword.vue';
import NotFound from './views/notfound.vue';
import Auth from './services/auth';

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
    '/': {
      component: Main,
      auth: true,
      subRoutes: {
        '/': {
          component: Dashboard,
        },
        '/logout': {
          component: Logout,
        },
        '/users': {
          component: Users,
        },
        '/products': {
          component: Products,
        },
        '/products/add': {
          component: AddProducts,
        },
        '/products/edit/:id': {
          component: AddProducts,
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
      component: NotFound,
    },
  });

  router.beforeEach((transition) => {
    const user = new Auth().currentUser();

    if (transition.to.auth && user && !user.sessionId) {
      transition.redirect('/login');
    } else if (transition.to.path.toLowerCase() === '/login' && user && user.sessionId) {
      transition.redirect('/');
    }

    transition.next();
  });
}

module.exports = routing;
