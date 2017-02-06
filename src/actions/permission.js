import log from 'loglevel';
import Constants from 'src/constants';
import PermissionApi from 'services/permissionApi';

function setManyPermissions({ commit }, { user, permissions }) {
  new PermissionApi()
    .set(user, permissions)
    .catch(e => log.errror(e));
}

function setOnePermission({ commit }, { user, permission }) {
  new PermissionApi()
    .set(user, [permission])
    .catch(e => log.error(e));
}

function unsetManyPermissions({ commit }, { user, permissions }) {
  new PermissionApi()
    .unset(user, permissions)
    .catch(e => log.error(e));
}

function unsetOnePermission({ commit }, { user, permission }) {
  new PermissionApi()
    .unset(user, [permission])
    .catch(e => log.error(e));
}

const INITIAL_STATE = {};

const ACTIONS = {
  [Constants.SET_USER_PERMISSIONS]: setManyPermissions,
  [Constants.SET_USER_PERMISSION]: setOnePermission,
  [Constants.UNSET_USER_PERMISSIONS]: unsetManyPermissions,
  [Constants.UNSET_USER_PERMISSION]: unsetOnePermission,
};

const MUTATIONS = {
};

const GETTERS = {
};

const PermissionActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default PermissionActions;
