// @flow
import CrudApi from 'services/crudApi';
import Constants from 'src/constants';

let singleton : any = null;

export default class ProductApi extends CrudApi {
  constructor() {
    super('product', {
      SEARCH: () => '/api/v1/products/search',
      GET_ONE_WITH_SKU: sku => `/api/v1/products/sku/${sku}`,
    });

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }

  singleBySku(sku : string, includeDeleted : boolean = false) {
    return super
      .get(`${this.routes.GET_ONE_WITH_SKU(sku)}?includeDeleted=${includeDeleted.toString()}`)
      .then(json => json.result);
  }

  imageUploadIntercept(file : any, xhr : Object) {
    super.prepareXhr(xhr);
  }

  getImageUploadUrl(id : number) {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return `${Constants.API_ROOT}/api/v1/products/${id}/images`;
  }

  deleteImage(productId : number, id : number) {
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
