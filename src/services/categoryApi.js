import CrudApi from './crudApi';

export default class CategoryApi extends CrudApi {
  constructor() {
    super('category');

    if (CategoryApi.prototype.singleton) {
      return CategoryApi.prototype.singleton;
    }
    CategoryApi.prototype.singleton = this;

    return this;
  }
}
