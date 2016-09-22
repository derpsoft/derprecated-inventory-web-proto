import Constants from '../constants';
import Auth from '../services/auth';
import SessionStore from '../services/sessionStore';

export function setUser({ dispatch }, user) {
  dispatch(Constants.SET_USER, user);
};

export function getUser({ dispatch }) {

}

export function login({ dispatch}, username, password) {
  dispatch(Contants.REQUEST_LOGIN);

  Auth.login(username, password)
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
        dispatch(Constants.REQUEST_LOGIN_SUCCESS);
      } else {
        this.user.isAuthenticated = false;
        dispatch(Constants.REQUEST_LOGIN_FAILED);
      }
    })
    .catch(dispatch(Constants.REQUEST_LOGIN_FAILED))

}

export const INITIAL_STATE = {
  user: {
    user: {
      isAuthenticated: false,
      userName: null,
      sessionId: null,
      userId: null,
    }
  }
};

export const MUTATIONS = {
  [SET_USER]: (state, user) => {
    state.user = user;
  }
};

export { setUser };
