// @flow
import CrudApi from 'services/crudApi';

let singleton : any = null;

export default class CategoryApi extends CrudApi {
  constructor() {
    super('category');

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }
}
