import CrudApi from '../crudApi';

class CategoryApi extends CrudApi {
  constructor() {
    super('category');

    if (CategoryApi.prototype.singleton) {
      return CategoryApi.prototype.singleton;
    }
    CategoryApi.prototype.singleton = this;

    return this;
  }
}

export default CategoryApi;
