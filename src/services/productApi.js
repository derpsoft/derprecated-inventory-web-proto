import CrudApi from 'services/crudApi';
import Constants from 'src/constants';

export default class ProductApi extends CrudApi {
  constructor() {
    super('product', {
      SEARCH: () => '/api/v1/products/search',
      GET_ONE_WITH_SKU: sku => `/api/v1/products/sku/${sku}`,
    });

    if (ProductApi.prototype.singleton) {
      return ProductApi.prototype.singleton;
    }
    ProductApi.prototype.singleton = this;

    return this;
  }

  singleBySku(sku, includeDeleted = false) {
    return super
      .get(`${this.routes.GET_ONE_WITH_SKU(sku)}?includeDeleted=${includeDeleted}`)
      .then(json => json.result);
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
      .then(json => json.result);
  }
}
