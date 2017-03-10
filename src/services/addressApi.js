import CrudApi from 'services/crudApi';

export default class AddressApi extends CrudApi {
  constructor() {
    super('address');

    if (AddressApi.prototype.singleton) {
      return AddressApi.prototype.singleton;
    }
    AddressApi.prototype.singleton = this;

    return this;
  }
}
