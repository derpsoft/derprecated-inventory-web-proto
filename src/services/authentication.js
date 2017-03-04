import _ from 'lodash';
import Auth0Lock from 'auth0-lock';
import config from 'src/../config';

const {
  clientId,
  domain
} = config.auth0;
const options = {
  auth: {
    redirect: true,
    params: {
      // audience: config.auth0.audience,
      scope: config.auth0.scope,
    },
  }
};


const _getUserInfo = _.throttle((lock, {
  accessToken,
  idToken,
}) => {
  return new Promise((resolve, reject) => {
    lock.getUserInfo(accessToken, (error, profile) => {
      if (error) {
        return reject(error);
      }
      return resolve({
        profile: {
          ...profile,
          userName: profile.nickname,
          displayName: profile.name,
        },
        accessToken,
        idToken,
      });
    });
  });
}, 5000, {
  leading: true,
  trailing: false
});

/*
  Wrapper for auth0 lock calls and similar.

  See https://auth0.com/docs/architecture-scenarios/application/spa-api
  for a discussion about structure and explanation of the keys in use.
 */
class Auth {
  constructor() {
    this.lock = new Auth0Lock(clientId, domain, options);
  }

  getUserInfo(tokens) {
    return _getUserInfo(this.lock, tokens);
  }

  onAuthenticated(callback) {
    this.lock.on('authenticated', (authResult) => {
      this.getUserInfo(authResult)
        .then(callback)
        .catch((e) => {
          throw e;
        });
    });
  }

  onAuthorizationError(callback) {
    this.lock.on('authorization_error', callback);
  }

  onUnrecoverableError(callback) {
    this.lock.on('unrecoverable_error', callback);
  }

  show() {
    this.lock.show();
  }

  onShow(callback) {
    this.lock.on('show', callback);
  }

  hide() {
    this.lock.hide();
  }

  onHide(callback) {
    this.lock.on('hide', callback);
  }
}

export default Auth;
