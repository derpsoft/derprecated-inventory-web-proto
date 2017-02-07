import CrudApi from 'services/crudApi';
import Constants from 'src/constants';

export default class ProductApi extends CrudApi {
  constructor() {
    super('product', {
      SEARCH: () => '/api/v1/products/search'
    });

    if (ProductApi.prototype.singleton) {
      return ProductApi.prototype.singleton;
    }
    ProductApi.prototype.singleton = this;

    return this;
  }

  singleBySku(sku, includeDeleted = false) {
    return super
      .post(`${this.routes.SEARCH()}`, {
        body: this.toJson({
          sku,
          includeDeleted,
          take: 1,
        })
      })
      .then(res => res.json())
      .then(json => json.results[0]);
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

  deleteImage(productId, id) {
    if (productId < 1) {
      throw new Error('productId must be >= 1');
    }
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return super
      .delete(`/api/v1/products/${productId}/images/${id}`)
      .then(res => res.json())
      .then(json => json.result);
  }
}
