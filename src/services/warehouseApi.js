// @flow

import CrudApi from 'services/crudApi';

let singleton : any = null;

export default class WarehouseApi extends CrudApi {
  constructor() {
    super('warehouse');

    if (singleton) {
      return singleton;
    }

    singleton = this;

    return singleton;
  }
}
