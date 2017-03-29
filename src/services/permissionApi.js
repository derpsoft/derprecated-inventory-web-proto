// @flow
import Fetchable from 'services/fetchable';
import store from 'stores/store';
import Constants from 'src/constants';

let singleton : any = null;

class PermissionApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }

  set(user : Object, permissions : Object) : Promise<Object> {
    return super.patch(`/api/users/${user.id}/permissions`, {
      body: this.toForm({
        permissions
      })
    });
  }
}

export default PermissionApi;
