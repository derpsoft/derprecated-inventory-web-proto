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

  register(userName, password, email, firstName, lastName) {
    const info = {
      userName,
      password,
      firstName,
      lastName,
      email,
    };
    return super.post('/register', {
      body: JSON.stringify(info)
    })
      .then(res => res.json())
      .then(json => {
        return this.setUser(json);
      });
  }

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
      return this.setUser(json);
    });
  }

  logout() {
    return super.post('/logout', { mode: 'no-cors' });
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
