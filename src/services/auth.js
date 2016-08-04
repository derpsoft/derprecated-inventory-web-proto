import $ from 'jquery';
import router from 'vue-router';

class Auth {
  constructor(args = {}) {
    if (Auth.prototype.singleton) {
      return Auth.prototype.singleton;
    }
    Auth.prototype.singleton = this;

    this.user = {};
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
    this.on('beforeLogin');

    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    return fetch('https://derprecated-inventory-api.azurewebsites.net/auth/credentials.json', {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(json => {
      if (json.sessionId) {
        this.user.isAuthenticated = true;
        this.user.userName = json.userName;
        this.user.sessionId = json.sessionId;
        this.user.userId = json.userId;

        this.raise('change', {
          changed: 'isAuthenticated',
          from: false,
          to: true,
        });
      } else {
        this.user.isAuthenticated = false;
      }
      return this.currentUser();
    });
  }

  isAuthenticated() {
    return this.currentUser() && this.currentUser().isAuthenticated;
  }

  currentUser() {
    return {
      name: this.user.name,
      email: this.user.email,
      avatar: this.user.avatar,
      isAuthenticated: this.user.isAuthenticated,
    };
  }

  raise(e, arg) {
    console.info('[event]', 'e', arg);
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
