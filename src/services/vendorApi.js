import CrudApi from '../crudApi';

class VendorApi extends CrudApi {

  constructor() {
    super(Constants.API_ROOT, store);

    if (VendorApi.prototype.singleton) {
      return VendorApi.prototype.singleton;
    }
    VendorApi.prototype.singleton = this;

    return this;
  }
}

export default VendorApi;
