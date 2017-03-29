// @flow
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
  } : Object) {
    if (quantity === 0) {
      throw new Error('quantity must be != 0');
    }
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


  getLogs(skip : number = 0, take : number = 25) : Promise<Object> {
    return super.get(`/api/v1/inventory-transactions?skip=${skip}&take=${take}`)
      .then(json => json.result);
  }

  countLogs() : Promise<Object> {
    return super.get('/api/v1/inventory-transactions/count')
      .then(json => json.result || json.count);
  }

  searchLogs(query : string, skip : number = 0, take : number = 25) : Promise<Object> {
    const body : any = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);
    body.set('query', query);

    return super.get(`/api/v1/inventory-transactions/search?${body}`);
  }
}

export default InventoryApi;
