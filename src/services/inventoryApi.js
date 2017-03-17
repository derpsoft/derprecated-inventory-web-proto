import Fetchable from 'services/fetchable';
import store from 'stores/store';
import Constants from 'src/constants';

class InventoryApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);
  }

  _createTransaction({
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

  getLogs() {
    return super.get('/api/v1/inventory-transactions')
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
