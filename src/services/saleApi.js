import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class SaleApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (SaleApi.prototype.singleton) {
      return SaleApi.prototype.singleton;
    }
    SaleApi.prototype.singleton = this;

    return this;
  }

  log(sale) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    return super.post('/api/v1/sales', {
      body: this.toJson(sale),
      headers
    })
    .then(res => res.json());
  }
}

export default SaleApi;
