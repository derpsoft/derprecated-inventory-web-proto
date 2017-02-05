import CrudApi from './crudApi';

export default class VendorApi extends CrudApi {
  constructor() {
    super('vendor');

    if (VendorApi.prototype.singleton) {
      return VendorApi.prototype.singleton;
    }
    VendorApi.prototype.singleton = this;

    return this;
  }
}
