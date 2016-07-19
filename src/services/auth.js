import $ from 'jquery';
import router from 'vue-router';

class Auth {
  constructor(args = {}) {
    if (Auth.prototype.singleton) {
      return Auth.prototype.singleton;
    }
    Auth.prototype.singleton = this;

    this.currentUser = null;
    this.loginUrl = args.login || '/login';
    this.handlers = {
      beforeLogin: [],
      login: [],
      afterLogin: [],

      beforeLogout: [],
      logout: [],
      afterLogout: [],

      change: [],
    };

    this.trap403();

    return this;
  }

  trap403() {
    $(document).ajaxError((e, jqxhr) => {
      if (jqxhr.status === 403) {
        if (this.isAuthenticated()) {
          this.currentUser.isAuthenticated = false;
          this.raise('change', {
            changed: 'isAuthenticated',
            from: true,
            to: false,
          });
        }
        this.showLogin();
      }
    });
  }

  showLogin() {
    router.go(this.loginUrl);
  }

  tryLogin(username, password) {
    this.onBeforeLogin();

    $.post('/api/auth/credentials', {
      username,
      password,
    }).then(() => { /* todo */ });
  }

  isAuthenticated() {
    return this.currentUser() && this.currentUser().isAuthenticated;
  }

  currentUser() {
    return {
      name: this.currentUser.name,
      email: this.currentUser.email,
      avatar: this.currentUser.avatar,
      isAuthenticated: this.currentUser.isAuthenticated,
    };
  }

  raise(e, arg) {
    if (this.handlers[e]) {
      this.handlers[e].map(fn => fn(arg));
    }
  }

  // add an event handler
  on(e, callback) {
    if (this.handlers[e]) {
      this.handlers[e].push(callback);
    }
  }
}

export default Auth;
