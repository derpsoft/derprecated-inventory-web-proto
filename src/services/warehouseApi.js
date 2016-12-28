import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class WarehouseApi extends Fetchable {

  constructor() {
    super(Constants.API_ROOT, store);

    if (WarehouseApi.prototype.singleton) {
      return WarehouseApi.prototype.singleton;
    }
    WarehouseApi.prototype.singleton = this;

    return this;
  }

  count() {
    return super.get('/api/v1/warehouses/count')
    .then(res => res.json())
    .then(json => json.count);
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/warehouses?${body}`)
    .then(res => res.json())
    .then((json) => {
      return json.warehouses;
    });
  }

  single(id) {
    return super.get(`/api/v1/warehouses/${id}`)
    .then(res => res.json())
    .then((json) => {
      return json.warehouse;
    });
  }

  search(query) {
    return super.post('/api/v1/warehouses/search', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  typeahead(query) {
    const body = new URLSearchParams();
    body.set('query', query);

    return super.get(`/api/v1/warehouses/typeahead?${body}`)
    .then(res => res.json())
    .then(json => json.warehouses);
  }

  save(warehouse) {
    const id = warehouse.id;
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete warehouse.id;
    return super.put(`/api/v1/warehouses/${id}`, {
      body: this.toJson({ warehouse }),
      headers
    })
    .then(res => res.json())
    .then(json => json.warehouse);
  }

  create(warehouse) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete warehouse.id;
    return super.post('/api/v1/warehouses', {
      body: this.toJson({ warehouse }),
      headers
    })
    .then(res => res.json())
    .then(json => json.warehouse);
  }
}

export default WarehouseApi;
