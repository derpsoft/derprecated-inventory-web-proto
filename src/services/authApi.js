// import router from 'vue-router';
import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class AuthApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (AuthApi.prototype.singleton) {
      return AuthApi.prototype.singleton;
    }
    AuthApi.prototype.singleton = this;

    return this;
  }

  register(username, password, email, firstName, lastName) {
    return super.post('/register', {
      body: this.toForm({
        username,
        password,
        email,
        firstName,
        lastName
      })
    })
      .then(res => res.json())
      .then(json => {
        return this.setUser(json);
      });
  }

  login(username, password) {
    return super.post('/auth/credentials', {
      body: this.toForm({
        username,
        password
      })
    })
    .then(res => res.json())
    .then(json => {
      return this.setUser(json);
    });
  }

  logout() {
    return super.post('/logout');
  }

  setUser(response) {
    const isAuthenticated = !!response.sessionId;
    const user = {
      isAuthenticated
    };

    if (isAuthenticated) {
      user.userName = response.userName;
      user.sessionId = response.sessionId;
      user.userId = response.userId;
    }
    return user;
  }
}

export default AuthApi;
