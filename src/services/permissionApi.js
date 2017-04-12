// @flow
import {
  Fetchable
} from 'derp-api';

let singleton: any = null;

class PermissionApi extends Fetchable {
  constructor() {
    super();

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
