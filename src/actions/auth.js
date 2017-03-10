import _ from 'lodash';
// import log from 'loglevel';
import Constants from 'src/constants';
// import AuthApi from 'services/authApi';
import Auth from 'services/authentication';

/*
this is a temporary mechanism to keep the user logged in beyond
just the current pageload. might be worth keeping around,
but it'd be better to rely on the existence of the session cookie.
*/
/* TODO this should be split into separate module for reuse */
function read(k) {
  const disk = window.localStorage;
  let data = {};

  if (disk) {
    try {
      data = JSON.parse(disk.getItem(`@derprecated:${k}`));
    } catch (e) {
      // ignore
    }
  }

  return data;
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

const Permissions = Constants.permissions;
const Roles = Constants.roles;

function logout({
  commit,
}) {
  commit(Constants.LOGOUT);
}

function authenticated({
  dispatch,
  commit
}, {
  profile,
  accessToken,
  idToken
}) {
  commit(Constants.SET_PROFILE, profile);
  commit(Constants.SET_TOKENS, {
    accessToken,
    idToken
  });
}

function login({
  dispatch,
  commit
}) {
  const auth = new Auth();

  const err = () => {
    logout({
      commit
    });
    dispatch(Constants.SHOW_TOASTR, {
      type: 'error',
      message: 'Incorrect username/password combination.'
    });
  };

  auth.onAuthenticated(user => authenticated({
    dispatch,
    commit
  }, user));

  auth.onAuthorizationError(err);

  auth.lock.resumeAuth(window.location.hash, (e, authResult) => {
    if (e) {
      return err(e);
    }
    if (authResult) {
      return auth.getUserInfo(authResult)
        .then(user => authenticated({
          dispatch,
          commit
        }, user))
        .catch(err);
    }
    return auth.show();
  });
}

function getProfile({
  commit,
  dispatch
}) {
  new Auth()
    .getUserInfo(read('tokens'))
    .then(user => authenticated({
      commit,
      dispatch
    }, user))
    .catch(() => logout({
      commit
    }));
}

const INITIAL_STATE = {
  tokens: _.merge({
    accessToken: '',
    idToken: '',
  }, read('tokens')),
  profile: _.merge({
    userName: '',
    displayName: '',
    email: '',
    permissions: [],
    roles: [],
  }, read('profile')),
};

const ACTIONS = {
  [Constants.LOGIN]: login,
  [Constants.GET_PROFILE]: getProfile,
  [Constants.LOGOUT]: logout,
};

const MUTATIONS = {
  [Constants.SET_PROFILE]: (state, profile) => {
    save('profile', profile);
    state.profile = profile;
  },
  [Constants.SET_TOKENS]: (state, tokens) => {
    save('tokens', tokens);
    state.tokens = tokens;
  },
  [Constants.LOGOUT]: (state) => {
    save('profile', {});
    save('tokens', {});
    state.profile = {};
    state.tokens = null;
  },
};

const GETTERS = {
  isAuthenticated: (state, getters) => {
    const {
      accessToken,
      // idToken
    } = getters.tokens;
    return !_.isEmpty(accessToken); // && tokens.idToken;
  },
  tokens: (state) => {
    return state.tokens || {};
  },
  profile: (state) => {
    return state.profile;
  },
  authorization: (state, getters) => {
    return getters.profile.authorization || {};
  },
  currentUserPermissions: (state, getters) => {
    return getters.authorization.permissions;
  },
  currentUserRoles: (state, getters) => {
    return getters.authorization.roles;
  },

  canLogin: (state, getters) => {
    const allowed = [
      Permissions.LOGIN.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canManageSales: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_SALES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canManageInventory: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_INVENTORY.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
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

  canManageUsers: (state, getters) => {
    const allowed = [
      Roles.DELEGATED_ADMIN_USER,
      Roles.DELEGATED_ADMIN_ADMINISTRATOR,
    ];
    return !!_.intersection(getters.currentUserRoles, allowed).length;
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

  canDeleteVendors: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_VENDORS.key,
      Permissions.DELETE_VENDORS.key,
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

  canDeleteProducts: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_PRODUCTS.key,
      Permissions.DELETE_PRODUCTS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canReadImages: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_IMAGES.key,
      Permissions.READ_IMAGES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertImages: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_IMAGES.key,
      Permissions.UPSERT_IMAGES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canDeleteImages: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_IMAGES.key,
      Permissions.DELETE_IMAGES.key,
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

  canDeleteWarehouses: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_WAREHOUSES.key,
      Permissions.DELETE_WAREHOUSES.key,
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

  canDeleteLocations: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_LOCATIONS.key,
      Permissions.DELETE_LOCATIONS.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canReadCategories: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_CATEGORIES.key,
      Permissions.READ_CATEGORIES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertCategories: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_CATEGORIES.key,
      Permissions.UPSERT_CATEGORIES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canDeleteCategories: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
      Permissions.MANAGE_CATEGORIES.key,
      Permissions.DELETE_CATEGORIES.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
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

  canReadSales: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
    ];
    return !!_.intersection(getters.currentUserPermissions, allowed).length;
  },

  canUpsertSales: (state, getters) => {
    const allowed = [
      Permissions.EVERYTHING.key,
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
