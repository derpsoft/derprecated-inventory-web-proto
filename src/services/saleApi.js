// @flow
import CrudApi from 'services/crudApi';

let singleton : any = null;

export default class SaleApi extends CrudApi {
  constructor() {
    super('sale');

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }
}
