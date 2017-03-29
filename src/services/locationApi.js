// @flow
import CrudApi from 'services/crudApi';

let singleton : any = null;

export default class LocationApi extends CrudApi {
  constructor() {
    super('location');

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }
}
