import Fetchable from './fetchable';
import store from '../stores/store';

class WarehouseApi extends Fetchable {

  constructor() {
    super('https://derprecated-inventory-api.azurewebsites.net', store);

    if (WarehouseApi.prototype.singleton) {
      return WarehouseApi.prototype.singleton;
    }
    WarehouseApi.prototype.singleton = this;

    return this;
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/warehouses?${body}`)
    .then(res => res.json())
    .then(json => {
      return json.warehouses;
    });
  }

  single(id) {
    return super.get(`/api/v1/warehouses/${id}`)
    .then(res => res.json())
    .then(json => {
      return json.warehouse;
    });
  }

  search(query) {
    return super.post('/api/v1/warehouses/typeahead', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  save(warehouse) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    return super.post('/api/v1/warehouses/save', {
      body: this.toJson({ warehouse }),
      headers
    })
    .then(res => res.json());
  }

  create(warehouse) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete warehouse.id;
    return super.post('/api/v1/warehouses/save', {
      body: this.toJson({ warehouse }),
      headers
    })
    .then(res => res.json());
  }
}

export default WarehouseApi;
