import Fetchable from 'services/fetchable';
import store from 'stores/store';
import Constants from 'src/constants';

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
    return super.patch(`/api/users/${user.id}/permissions`, {
      body: this.toForm({
        permissions
      })
    });
  }
}

export default PermissionApi;
