import CrudApi from 'services/crudApi';
import Constants from 'src/constants';

export default class Api extends CrudApi {
  constructor() {
    super('image');
  }

  getImageUploadUrl() {
    return `${Constants.API_ROOT}/api/v1/images`;
  }

  imageUploadIntercept(file, xhr) {
    super.prepareXhr(xhr);
  }
}
