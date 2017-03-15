import _ from 'lodash';
import inflection from 'lodash-inflection';
import CrudApi from 'services/crudApi';

_.mixin(inflection);

export default class OrderApi extends CrudApi {
  constructor() {
    super('order', {
      CAPTURE_BILLING: (x, id) => `/api/v1/${_(x).pluralize().toLower()}/${id}/billing`,
      UPDATE_STATUS: (x, id, status) => `/api/v1/${_(x).pluralize().toLower()}/${id}/${status}`
    });

    if (OrderApi.prototype.singleton) {
      return OrderApi.prototype.singleton;
    }
    OrderApi.prototype.singleton = this;

    return this;
  }

  captureBilling({
    id
  }, token) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return super
      .post(this.routes.CAPTURE_BILLING(this.name, id), {
        body: this.toJson({
          token
        }),
        headers
      })
      .then(json => json.result || json[this.one]);
  }

  updateStatus({
    id
  }, status) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return super
      .post(this.routes.UPDATE_STATUS(this.name, id, status), {
        headers
      })
      .then(json => json.result || json[this.one]);
  }
}
