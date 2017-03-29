// @flow

import CrudApi from 'services/crudApi';

let singleton : any = null;

export default class VendorApi extends CrudApi {
  constructor() {
    super('vendor');

    if (singleton) {
      return singleton;
    }

    singleton = this;

    return singleton;
  }
}
