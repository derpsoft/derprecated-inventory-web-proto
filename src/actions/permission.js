// @flow
import log from 'loglevel';
import Constants from 'src/constants';
import PermissionApi from 'services/permissionApi';

function setManyPermissions({ commit }, { user, permissions }) {
  new PermissionApi()
    .set(user, permissions)
    .catch(e => log.error(e));
}

function setOnePermission({ commit } : Object, { user, permission } : Object) : void {
  new PermissionApi()
    .set(user, [permission])
    .catch(e => log.error(e));
}

const INITIAL_STATE = {};

const ACTIONS = {
  [Constants.SET_USER_PERMISSIONS]: setManyPermissions,
  [Constants.SET_USER_PERMISSION]: setOnePermission,
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
