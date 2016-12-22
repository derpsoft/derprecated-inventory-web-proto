import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class ProductApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (ProductApi.prototype.singleton) {
      return ProductApi.prototype.singleton;
    }
    ProductApi.prototype.singleton = this;

    return this;
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/products?${body}`)
      .then(res => res.json())
      .then((json) => {
        return json.products;
      });
  }

  retrieve(id) {
    return super.get(`/api/v1/products/${id}`)
      .then(res => res.json())
      .then((json) => {
        return json.product;
      });
  }

  search(query) {
    return super.post('/api/v1/products/typeahead', {
      body: this.toForm({
        query
      })
    })
    .then(res => res.json());
  }

  save(product) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    return super.post('/api/v1/products/save', {
      body: this.toJson({
        product
      }),
      headers
    })
    .then(res => res.json());
  }

  create(product) {
    return super.post('/api/v1/products/save', {
      body: this.toForm(product)
    })
    .then(res => res.json());
  }
}
export default ProductApi;
