import CrudApi from './crudApi';

class WarehouseApi extends CrudApi {
  constructor() {
    super('warehouse');

    if (WarehouseApi.prototype.singleton) {
      return WarehouseApi.prototype.singleton;
    }
    WarehouseApi.prototype.singleton = this;

    return this;
  }
}

export default WarehouseApi;
