import _ from 'lodash';
import log from 'loglevel';
import Constants from '../constants';
import AuthApi from '../services/authApi';

const Permissions = Constants.permissions;

function clear({
  commit
}) {
  commit(Constants.CLEAR_PROFILE);
  commit(Constants.CLEAR_SESSION);
}

function clearLoginError({
  commit
}) {
  commit(Constants.LOGIN_FAILED, false);
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
        commit(Constants.SET_SESSION, json);
        dispatch(Constants.GET_PROFILE);
      } else {
        clear({
          dispatch,
          commit
        });
      }
    })
    .catch(() => {
      clear({
        commit
      });
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Incorrect username/password combination.'
      });
    });
}

function logout({
  commit
}) {
  clear({
    commit
  });
  new AuthApi().logout().catch(e => log.error(e));
}

function getProfile({
  commit
}) {
  new AuthApi().profile()
    .then((json) => {
      if (json) {
        commit(Constants.SET_PROFILE, json.profile);
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
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Registration failed.'
      });
      log.error(e);
    });
}

function forgotPassword({
  commit
}, {
  email
}) {
  new AuthApi().forgotPassword(email)
    .then(() => {
      commit(Constants.SET_PASSWORD_RESET_STATUS, true);
    });
}

function resetPassword(state, {
  email,
  password,
  passwordRepeat,
  token
}) {
  new AuthApi().resetPassword(email, token, password, passwordRepeat)
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
  login: {
    error: false,
  },
  resetPassword: {
    isSuccess: false
  },
  profile: {
    userName: '',
    displayName: '',
    email: '',
    permissions: []
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
  [Constants.CLEAR_LOGIN_ERROR]: clearLoginError,
  [Constants.RESET_PASSWORD]: resetPassword,
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
  [Constants.LOGIN_FAILED]: (state, value) => {
    state.login.error = value;
  },
  [Constants.SET_PASSWORD_RESET_STATUS]: (state, value) => {
    state.resetPassword.isSuccess = value;
  },
};

const GETTERS = {
  isAuthenticated: (state) => {
    return state.session.isAuthenticated;
  },
  profile: (state) => {
    return state.profile;
  },
  loginError: (state) => {
    return state.login.error;
  },
  isResetPasswordSuccess: (state) => {
    return state.resetPassword.isSuccess;
  },
  currentUserPermissions: (state) => {
    return (state.profile || {}).permissions;
  },
  canReadUsers: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_USERS.key,
      Permissions.READ_USERS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertUsers: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_USERS.key,
      Permissions.UPSERT_USERS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canReadVendors: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_VENDORS.key,
      Permissions.READ_VENDORS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertVendors: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_VENDORS.key,
      Permissions.UPSERT_VENDORS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canReadProducts: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_PRODUCTS.key,
      Permissions.READ_PRODUCTS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertProducts: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_PRODUCTS.key,
      Permissions.UPSERT_PRODUCTS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canReadWarehouses: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_WAREHOUSES.key,
      Permissions.READ_WAREHOUSES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertWarehouses: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_WAREHOUSES.key,
      Permissions.UPSERT_WAREHOUSES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canReadLocations: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_LOCATIONS.key,
      Permissions.READ_LOCATIONS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertLocations: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_LOCATIONS.key,
      Permissions.UPSERT_LOCATIONS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canReadCategories: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_CATEGORIES,
      Permissions.READ_CATEGORIES,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length && false;
  },

  canUpsertCategories: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_CATEGORIES,
      Permissions.UPSERT_CATEGORIES,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length && false;
  },

  canReceiveInventory: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_INVENTORY.key,
      Permissions.RECEIVE_INVENTORY.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canDispatchInventory: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_INVENTORY.key,
      Permissions.DISPATCH_INVENTORY.key,
      Permissions.RELEASE_INVENTORY.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },
};

const AuthActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default AuthActions;
