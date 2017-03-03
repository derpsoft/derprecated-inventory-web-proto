import Auth0Lock from 'auth0-lock';
import config from 'src/../config';

const {
  clientId,
  domain
} = config.auth0;
const options = {
  auth: {
    redirect: true,
  }
};

class Auth {
  constructor() {
    this.lock = new Auth0Lock(clientId, domain, options);
  }

  getUserInfo({
    accessToken,
    idToken,
  }) {
    return new Promise((resolve, reject) => {
      this.lock.getUserInfo(accessToken, (error, profile) => {
        if (error) {
          return reject(error);
        }
        return resolve({
          profile: {
            ...profile,
            userName: profile.nickname,
            displayName: profile.name,
          },
          permissions: '',
          accessToken,
          idToken,
        });
      });
    });
  }

  onAuthenticated(callback) {
    this.lock.on('authenticated', ({
      accessToken
    }) => {
      this.getUserInfo(accessToken)
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
