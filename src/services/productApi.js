import Fetchable from './fetchable';
import store from '../stores/store';

class ProductApi extends Fetchable {
  constructor() {
    super('https://derprecated-inventory-api.azurewebsites.net', store);

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
    .then(json => {
      return json.products;
    });
  }

  retrieve(id) {
    return super.get(`/api/v1/products/${id}`)
    .then(res => res.json())
    .then(json => {
      return json.product;
    });
  }

  search(query) {
    return super.post('/api/v1/products/typeahead', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  update() {

  }
}
export default ProductApi;
