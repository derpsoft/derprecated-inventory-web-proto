import _ from 'lodash';
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
      .then((json) => {
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
    .then((json) => {
      return this.setUser(json);
    });
  }

  logout() {
    return super.delete('/auth/credentials');
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

  profile() {
    return super.get('/api/v1/me')
      .then(res => res.json())
      .then((json) => {
        let profile = {};

        if (json) {
          profile = _.merge(profile, json);
        }

        return profile;
      });
  }

  forgotPassword(email) {
    return super.post('/api/v1/password/forgot', {
      body: this.toForm({ email })
    })
      .then(res => res.json())
      .then((json) => {
        return json;
      });
  }

  resetPassword(email, token, password, passwordRepeat) {
    return super.post('/api/v1/password/reset', {
      body: this.toForm({ email, token, password, passwordRepeat })
    })
      .then(res => res.json());
  }
}

export default AuthApi;
