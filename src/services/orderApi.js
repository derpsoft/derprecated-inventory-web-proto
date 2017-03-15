import _ from 'lodash';
import inflection from 'lodash-inflection';
import CrudApi from 'services/crudApi';

_.mixin(inflection);

export default class OrderApi extends CrudApi {
  constructor() {
    super('order', {
      CAPTURE_BILLING: (x, id) => `/api/v1/${_(x).pluralize().toLower()}/${id}/billing`,
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
}
