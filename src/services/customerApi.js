// @flow
import CrudApi from 'services/crudApi';

let singleton : any = null;

export default class CustomerApi extends CrudApi {
  constructor() {
    super('customer');

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return this;
  }
}
