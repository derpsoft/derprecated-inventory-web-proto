// @flow
import CrudApi from 'services/crudApi';

let singleton : any = null;

export default class AddressApi extends CrudApi {
  constructor() {
    super('address');

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }
}
