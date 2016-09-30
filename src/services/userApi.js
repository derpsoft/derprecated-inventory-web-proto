import Fetchable from './fetchable';
import store from '../stores/store';
import _ from 'lodash';

class UserApi extends Fetchable {
  constructor() {
    super('https://derprecated-inventory-api.azurewebsites.net', store);

    if (UserApi.prototype.singleton) {
      return UserApi.prototype.singleton;
    }
    UserApi.prototype.singleton = this;

    return this;
  }

  profile() {
    return super.get('/api/v1/me')
      .then(res => res.json())
      .then(json => {
        let profile = {};

        if (json) {
          profile = _.merge(profile, json);
        }

        return profile;
      });
  }
}

export default UserApi;
