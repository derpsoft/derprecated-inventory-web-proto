// import router from 'vue-router';
import Fetchable from './fetchable';
import store from '../stores/store';

class Auth extends Fetchable {
  constructor() {
    super('https://derprecated-inventory-api.azurewebsites.net', store);

    if (Auth.prototype.singleton) {
      return Auth.prototype.singleton;
    }
    Auth.prototype.singleton = this;

    return this;
  }

  // showLogin() {
  //   router.go(this.loginUrl);
  // }

  login(username, password) {
    const creds = {
      username,
      password
    };
    return super.post('/auth/credentials', {
      body: JSON.stringify(creds)
    })
    .then(res => res.json())
    .then(json => {
      const isAuthenticated = !!json.sessionId;
      const user = {
        isAuthenticated
      };

      if (isAuthenticated) {
        user.userName = json.userName;
        user.sessionId = json.sessionId;
        user.userId = json.userId;
      }

      return user;
    });
  }

  logout() {
    return super.post('/logout')
      .then(res => res.json());
  }
}

export default Auth;
