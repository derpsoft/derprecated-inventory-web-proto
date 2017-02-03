import CrudApi from '../crudApi';

class SaleApi extends CrudApi {
  constructor() {
    super('sale');

    if (SaleApi.prototype.singleton) {
      return SaleApi.prototype.singleton;
    }
    SaleApi.prototype.singleton = this;

    return this;
  }
}

export default SaleApi;
