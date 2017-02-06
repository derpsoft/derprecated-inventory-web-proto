import Fetchable from 'services/fetchable';
import store from 'stores/store';
import Constants from 'src/constants';

class InventoryApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (InventoryApi.prototype.singleton) {
      return InventoryApi.prototype.singleton;
    }
    InventoryApi.prototype.singleton = this;

    return this;
  }

  _createTransaction({
    locationId,
    productId,
    quantity
  }) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    const xact = {
      locationId,
      productId,
      quantity
    };
    return super.post('/api/v1/inventory-transactions', {
      body: this.toJson({ ...xact
      }),
      headers
    })
    .then(res => res.json());
  }


  receiveInventory(xact) {
    if (xact.quantity <= 0) {
      throw new Error('quantity must be >= 0');
    }
    return this._createTransaction(xact);
  }

  dispatchInventory(xact) {
    if (xact.quantity >= 0) {
      throw new Error('quantity must be <= 0');
    }
    return this._createTransaction(xact)
      .then(res => res.inventoryTransaction);
  }

  getLogs(skip = 0, take = 25) {
    return this.searchLogs('', skip, take);
  }

  countLogs() {
    return super.get('/api/v1/inventory-transactions/count')
      .then(res => res.json())
      .then(json => json.count);
  }

  searchLogs(query, skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);
    body.set('query', query);

    return super.get(`/api/v1/inventory-transactions/search?${body}`)
      .then(res => res.json());
  }
}

export default InventoryApi;
