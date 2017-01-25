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

  create(sale) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    return super
      .post('/api/v1/sales', {
        body: this.toJson(sale),
        headers
      })
      .then(res => res.json())
      .then(json => json.result);
  }

  count() {
    return super
      .get('/api/v1/sales/count')
      .then(res => res.json())
      .then(json => json.result);
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super
      .get(`/api/v1/sales?${body}`)
      .then(res => res.json())
      .then(json => json.result);
  }

  typeahead(query) {
    const body = new URLSearchParams();
    body.set('query', query);

    return super
      .get(`/api/v1/sales/typeahead?${body}`)
      .then(res => res.json())
      .then(json => json.result);
  }
}

export default SaleApi;
