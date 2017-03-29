// @flow
import CrudApi from 'services/crudApi';
import Constants from 'src/constants';

export default class Api extends CrudApi {
  constructor() {
    super('image');
  }

  getImageUploadUrl() {
    return `${Constants.API_ROOT}/api/v1/images`;
  }

  imageUploadIntercept(file : any, xhr : Object) : void {
    super.prepareXhr(xhr);
  }
}
