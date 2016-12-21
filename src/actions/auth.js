import _ from 'lodash';
import Constants from '../constants';
import AuthApi from '../services/authApi';
// import log from 'loglevel';

function clear({
  commit
}) {
  commit(Constants.CLEAR_PROFILE);
  commit(Constants.CLEAR_SESSION);
}

function login({
  dispatch,
  commit
}, {
  username,
  password
}) {
  new AuthApi().login(username, password)
    .then((json) => {
      if (json.sessionId) {
        commit(Constants.SET_PROFILE, json.user);
        commit(Constants.SET_SESSION, json);
      } else {
        clear({
          dispatch,
          commit
        });
      }
    })
    .catch((e) => {
      clear({
        commit
      });
      dispatch(Constants.LOGIN_FAILED, e);
    });
}

function logout({
  commit
}) {
  clear({
    commit
  });
  new AuthApi().logout();
}

function getProfile({
  commit
}) {
  new AuthApi().profile()
    .then((json) => {
      if (json) {
        commit(Constants.SET_PROFILE, json.user);
      } else {
        clear({
          commit
        });
      }
    });
}

function register({
  commit,
  dispatch,
}, {
  username,
  password,
  firstName,
  lastName,
  email,
}) {
  new AuthApi().register(username, password, email, firstName, lastName)
    .then((json) => {
      if (json) {
        commit(Constants.SET_SESSION, json);
        dispatch(Constants.GET_PROFILE);
      } else {
        clear({
          commit
        });
      }
    })
    .catch((e) => {
      dispatch(Constants.REGISTRATION_FAILED, e);
    });
}

function forgotPassword(state, {
  email
}) {
  new AuthApi().forgotPassword(email)
    .then(() => {});
}

/*
this is a temporary mechanism to keep the user logged in beyond
just the current pageload. might be worth keeping around,
but it'd be better to rely on the existence of the session cookie.
*/
/* TODO this should be split into separate module for reuse */
function read(k) {
  const disk = window.localStorage;
  let user = {};

  if (disk) {
    try {
      user = JSON.parse(disk.getItem(`@derprecated:${k}`));
    } catch (e) {
      // ignore
    }
  }

  return user;
}

/*
this is a temporary mechanism to keep the user logged in beyond
just the current pageload. might be worth keeping around,
but it'd be better to rely on the existence of the session cookie.
*/
/* TODO this should be split into separate module for reuse */
function save(k, v) {
  const disk = window.localStorage;

  if (disk) {
    disk.setItem(`@derprecated:${k}`, JSON.stringify(v));
  }
}

const INITIAL_STATE = {
  profile: {
    userName: '',
    displayName: '',
    email: ''
  },
  session: _.merge({
    isAuthenticated: false,
    sessionId: null,
  }, read('session'))
};

const ACTIONS = {
  [Constants.LOGIN]: login,
  [Constants.GET_PROFILE]: getProfile,
  [Constants.LOGOUT]: logout,
  [Constants.REGISTER]: register,
  [Constants.FORGOT_PASSWORD]: forgotPassword,
  // [Constants.REGISTRATIONFAILED]:
  // [Constants.LOGIN_FAILED]:
};

const MUTATIONS = {
  [Constants.SET_SESSION]: (state, session) => {
    state.session = session;
    save('session', session);
  },
  [Constants.SET_PROFILE]: (state, profile) => {
    state.profile = profile;
  },
  [Constants.CLEAR_SESSION]: (state) => {
    const session = {
      isAuthenticated: false,
    };
    state.session = session;
    save('session', session);
  },
  [Constants.CLEAR_PROFILE]: (state) => {
    state.profile = {};
  },
};

const GETTERS = {
  isAuthenticated: (state) => {
    return state.session.isAuthenticated;
  },
  profile: (state) => {
    return state.user;
  }
};

const AuthActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default AuthActions;
