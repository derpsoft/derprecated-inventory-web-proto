import CrudApi from 'services/crudApi';

export default class CustomerApi extends CrudApi {
  constructor() {
    super('customer');

    if (CustomerApi.prototype.singleton) {
      return CustomerApi.prototype.singleton;
    }
    CustomerApi.prototype.singleton = this;

    return this;
  }
}
