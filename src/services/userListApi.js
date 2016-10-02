import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class UserListApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (UserListApi.prototype.singleton) {
      return UserListApi.prototype.singleton;
    }
    UserListApi.prototype.singleton = this;

    return this;
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/users?${body}`)
    .then(res => res.json())
    .then(json => {
      return json.users;
    });
  }
}

export default UserListApi;
