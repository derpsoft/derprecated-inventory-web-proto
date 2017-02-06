import CrudApi from 'services/crudApi';

export default class LocationApi extends CrudApi {
  constructor() {
    super('location');

    if (LocationApi.prototype.singleton) {
      return LocationApi.prototype.singleton;
    }
    LocationApi.prototype.singleton = this;

    return this;
  }
}
