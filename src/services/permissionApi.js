import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class PermissionApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (PermissionApi.prototype.singleton) {
      return PermissionApi.prototype.singleton;
    }
    PermissionApi.prototype.singleton = this;

    return this;
  }

  set(user, permissions) {
    return super.post('/assignroles', {
      body: this.toForm({
        username: user.email,
        permissions
      })
    });
  }

  unset(user, permissions) {
    return super.post('/unassignroles', {
      body: this.toForm({
        username: user.email,
        permissions
      })
    });
  }
}

export default PermissionApi;
