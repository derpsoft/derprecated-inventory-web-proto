import Constants from '../constants';
import Auth from '../services/auth';

function login({
  dispatch,
  commit
}, {
  username,
  password
}) {
  console.log('LOGIN ACTION');
  // dispatch(Constants.REQUEST_LOGIN);

  new Auth().login(username, password)
    .then(json => {
      if (json.sessionId) {
        commit(Constants.SET_USER, json);
        // dispatch(Constants.REQUEST_LOGIN_SUCCESS, json);
      } else {
        commit(Constants.CLEAR_USER);
        // dispatch(Constants.REQUEST_LOGIN_FAILED);
      }
    })
    .catch(() => dispatch(Constants.REQUEST_LOGIN_FAILED));
}

const INITIAL_STATE = {
  user: {
    isAuthenticated: false,
    userName: null,
    sessionId: null,
    userId: null,
  }
};

const ACTIONS = {
  [Constants.LOGIN]: login
};

const MUTATIONS = {
  [Constants.SET_USER]: (state, user) => {
    state.user = user;
  },
  [Constants.CLEAR_USER]: (state) => {
    state.user = { isAuthenticated: false };
  }
};

const GETTERS = {
  isAuthenticated: (state) => {
    return state.user.isAuthenticated;
  }
};

const UserActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default UserActions;
