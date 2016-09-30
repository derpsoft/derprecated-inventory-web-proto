import Constants from '../constants';
import Auth from '../services/auth';
import SessionStore from '../services/sessionStore';

function setUser(dispatch, user) {
  dispatch(Constants.SET_USER, user);
}

function getUser() {

}

function login(dispatch, username, password) {
  dispatch(Constants.REQUEST_LOGIN);

  Auth.login(username, password)
    .then(json => {
      if (json.sessionId) {
        new SessionStore().set(json);
        dispatch(Constants.SET_USER, json);
        dispatch(Constants.REQUEST_LOGIN_SUCCESS, json);
      } else {
        // this.user.isAuthenticated = false;
        dispatch(Constants.REQUEST_LOGIN_FAILED);
      }
    })
    .catch(dispatch(Constants.REQUEST_LOGIN_FAILED));
}

const INITIAL_STATE = {
  user: {
    isAuthenticated: false,
    userName: null,
    sessionId: null,
    userId: null,
  }
};

const MUTATIONS = {
  [Constants.SET_USER]: (state, user) => {
    state.user = user;
  }
};

export default {
  MUTATIONS,
  INITIAL_STATE,
  login,
  setUser,
  getUser
};
