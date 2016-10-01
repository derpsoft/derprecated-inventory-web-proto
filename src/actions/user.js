import Constants from '../constants';
import AuthApi from '../services/authApi';
import UserApi from '../services/userApi';
import _ from 'lodash';

function login({
  dispatch,
  commit
}, {
  username,
  password
}) {
  new AuthApi().login(username, password)
    .then(json => {
      if (json.sessionId) {
        commit(Constants.SET_SESSION, json);
        dispatch(Constants.GET_USER);
      } else {
        commit(Constants.CLEAR_SESSION);
      }
    })
    .catch((e) => {
      dispatch(Constants.LOGIN_FAILED, e);
    });
}

function logout({
  commit
}) {
  new AuthApi().logout();
  commit(Constants.CLEAR_SESSION);
  commit(Constants.CLEAR_USER);
}

function profile({
  commit
}) {
  new UserApi().profile()
    .then(json => {
      if (json) {
        commit(Constants.SET_USER, json);
      } else {
        commit(Constants.CLEAR_USER);
      }
    });
}

function register({
  commit,
  dispatch,
}, {
  userName,
  password,
  firstName,
  lastName,
  email,
}) {
  new AuthApi().register(userName, password, email, firstName, lastName)
    .then(json => {
      if (json) {
        commit(Constants.SET_SESSION, json);
        dispatch(Constants.GET_USER);
      } else {
        commit(Constants.CLEAR_USER);
      }
    })
    .catch((e) => {
      dispatch(Constants.REGISTRATION_FAILED, e);
    });
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
  user: {
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
  [Constants.GET_USER]: profile,
  [Constants.LOGOUT]: logout,
  [Constants.REGISTER]: register,
  // [Constants.REGISTRATIONFAILED]:
  // [Constants.LOGIN_FAILED]:
};

const MUTATIONS = {
  [Constants.SET_SESSION]: (state, session) => {
    state.session = session;
    save('session', session);
  },
  [Constants.SET_USER]: (state, user) => {
    state.user = user;
  },
  [Constants.CLEAR_SESSION]: (state) => {
    const session = {
      isAuthenticated: false,
    };
    state.session = session;
    save('session', session);
  },
  [Constants.CLEAR_USER]: (state) => {
    state.user = {};
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

const UserActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default UserActions;
