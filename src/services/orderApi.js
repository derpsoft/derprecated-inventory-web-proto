import CrudApi from 'services/crudApi';

export default class OrderApi extends CrudApi {
  constructor() {
    super('order');

    if (OrderApi.prototype.singleton) {
      return OrderApi.prototype.singleton;
    }
    OrderApi.prototype.singleton = this;

    return this;
  }
}
