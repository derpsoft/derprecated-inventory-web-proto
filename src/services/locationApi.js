import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class LocationApi extends Fetchable {

  constructor() {
    super(Constants.API_ROOT, store);

    if (LocationApi.prototype.singleton) {
      return LocationApi.prototype.singleton;
    }
    LocationApi.prototype.singleton = this;

    return this;
  }

  count() {
    return super.get('/api/v1/locations/count')
    .then(res => res.json())
    .then(json => json.count);
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/locations?${body}`)
    .then(res => res.json())
    .then((json) => {
      return json.locations;
    });
  }

  single(id) {
    return super.get(`/api/v1/locations/${id}`)
    .then(res => res.json())
    .then((json) => {
      return json.location;
    });
  }

  search(query) {
    return super.post('/api/v1/locations/search', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  typeahead(query) {
    const body = new URLSearchParams();
    body.set('query', query);

    return super.get(`/api/v1/locations/typeahead?${body}`)
    .then(res => res.json())
    .then(json => json.locations);
  }

  save(location) {
    const id = location.id;
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete location.id;
    return super.put(`/api/v1/locations/${id}`, {
      body: this.toJson({ location }),
      headers
    })
    .then(res => res.json())
    .then(json => json.location);
  }

  create(location) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete location.id;
    return super.post('/api/v1/locations', {
      body: this.toJson({ location }),
      headers
    })
    .then(res => res.json())
    .then(json => json.location);
  }
}

export default LocationApi;