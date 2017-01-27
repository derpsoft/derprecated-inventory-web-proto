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

  imageUploadIntercept(file, xhr) {
    super.prepareXhr(xhr);
  }

  getImageUploadUrl(id) {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return `${Constants.API_ROOT}/api/v1/products/${id}/images`;
  }

  list(skip = 0, take = 25, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);
    body.set('includeDeleted', includeDeleted);

    return super.get(`/api/v1/products?${body}`)
      .then(res => res.json())
      .then((json) => {
        return json.result;
      });
  }

  retrieve(id, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('includeDeleted', includeDeleted);

    return super.get(`/api/v1/products/${id}?${body}`)
      .then(res => res.json())
      .then((json) => {
        return json.result;
      });
  }

  search(query) {
    return super.post('/api/v1/products/search', {
      body: this.toForm({
        query
      })
    })
    .then(res => res.json());
  }

  typeahead(query, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('query', query);
    body.set('includeDeleted', includeDeleted);

    return super.get(`/api/v1/products/typeahead?${body}`)
    .then(res => res.json())
    .then(json => json.result);
  }

  save(product) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    return super.post('/api/v1/products', {
      body: this.toJson(product),
      headers
    })
    .then(res => res.json())
    .then(json => json.result);
  }

  delete(id) {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return super.delete(`/api/v1/products/${id}`)
    .then(res => res.json())
    .then(json => json.result);
  }

  deleteImage(productId, id) {
    if (productId < 1) {
      throw new Error('productId must be >= 1');
    }
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return super.delete(`/api/v1/products/${productId}/images/${id}`)
    .then(res => res.json())
    .then(json => json.result);
  }
}
export default ProductApi;
