import Fetchable from 'services/fetchable';
import store from 'stores/store';
import Constants from 'src/constants';

class InventoryApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);
  }

  create({
    locationId,
    productId,
    quantity,
  }) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const xact = {
      locationId,
      productId,
      quantity
    };
    return super
      .post('/api/v1/inventory-transactions', {
        body: this.toJson(xact),
        headers,
      });
  }


  getLogs(skip = 0, take = 25) {
    return super.get(`/api/v1/inventory-transactions?skip=${skip}&take=${take}`)
      .then(json => json.result);
  }

  countLogs() {
    return super.get('/api/v1/inventory-transactions/count')
      .then(json => json.result || json.count);
  }

  searchLogs(query, skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);
    body.set('query', query);

    return super.get(`/api/v1/inventory-transactions/search?${body}`);
  }
}

export default InventoryApi;
