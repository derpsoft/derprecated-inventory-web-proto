import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';
import _ from 'lodash';

class UserApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

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

  forgotPassword(email) {
    return super.post('/api/v1/password/reset', {
      email,
    })
      .then(res => res.json())
      .then(json => {
        return json;
      });
  }

}

export default UserApi;
