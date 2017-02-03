import CrudApi from '../crudApi';

class UsersApi extends CrudApi {
  constructor() {
    super(Constants.API_ROOT, store);

    if (UsersApi.prototype.singleton) {
      return UsersApi.prototype.singleton;
    }
    UsersApi.prototype.singleton = this;

    return this;
  }
}

export default UsersApi;
