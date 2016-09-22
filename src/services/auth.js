import $ from 'jquery';
import router from 'vue-router';
import store from '../stores/store';
import Fetchable from './fetchable';

class Auth extends Fetchable {
  constructor(args = {}) {
    if (Auth.prototype.singleton) {
      return Auth.prototype.singleton;
    }
    super('https://derprecated-inventory-api.azurewebsites.net');

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

  login(username, password) {
    const creds = {
      username,
      password
    };
    return super.post('/login', creds)
      .then(res => res.json());
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
        body: JSON.stringify({
          username,
          password,
        }),
      })
      .then(res => res.json())
      .then(json => {
        if (json.sessionId) {
          this.user.isAuthenticated = true;
          this.user.userName = json.userName;
          this.user.sessionId = json.sessionId;
          this.user.userId = json.userId;
          store.dispatch('SET_USER', this.user);

          // Save to local storage as well
          if (window.localStorage) {
            window.localStorage.setItem('user', JSON.stringify(this.user));
          }

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

  getUser() {
    let user;
    if (window.localStorage) {
      user = JSON.parse(window.localStorage.getItem('user')) || {};
    }
    return user;
  }

  currentUser() {
    const user = this.getUser();

    return {
      name: this.userName || user.userName,
      email: this.user.email || user.email,
      avatar: this.user.avatar || user.avatar,
      isAuthenticated: this.user.isAuthenticated || user.isAuthenticated,
      sessionId: this.user.sessionId || user.sessionId,
    };
  }

  logout() {
    const user = {
      isAuthenticated: false,
      userName: null,
      sessionId: null,
      userId: null,
    };
    store.dispatch('SET_USER', user);

    if (window.localStorage) {
      window.localStorage.removeItem('user');
    }
  }

  raise(e, arg) {
    // console.info('[event]', 'e', arg);
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
