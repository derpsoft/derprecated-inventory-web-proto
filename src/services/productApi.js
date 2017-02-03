import CrudApi from './crudApi';
import Constants from '../constants';

export default class ProductApi extends CrudApi {
  constructor() {
    super('product');

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
