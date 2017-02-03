import CrudApi from './crudApi';

export default class UsersApi extends CrudApi {
  constructor() {
    super('user');

    if (UsersApi.prototype.singleton) {
      return UsersApi.prototype.singleton;
    }
    UsersApi.prototype.singleton = this;

    return this;
  }
}
