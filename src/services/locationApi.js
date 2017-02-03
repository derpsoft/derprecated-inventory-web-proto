import CrudApi from '../crudApi';

class LocationApi extends CrudApi {
  constructor() {
    super('location');

    if (LocationApi.prototype.singleton) {
      return LocationApi.prototype.singleton;
    }
    LocationApi.prototype.singleton = this;

    return this;
  }
}

export default LocationApi;
