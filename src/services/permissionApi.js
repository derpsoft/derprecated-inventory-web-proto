// @flow
import {
  Fetchable
} from 'derp-api';
import store from 'stores/store';
import Constants from 'src/constants';

let singleton: any = null;

class PermissionApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }

  set(user: Object, permissions: string[]): Promise < Object > {
    return super.patch(`/api/users/${user.id}/permissions`, {
      body: this.toForm({
        permissions
      })
    });
  }
}

export default PermissionApi;
