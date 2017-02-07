import store from 'stores/store';
import Constants from 'src/constants';
import Fetchable from 'services/fetchable';

class ReportApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (ReportApi.prototype.singleton) {
      return ReportApi.prototype.singleton;
    }
    ReportApi.prototype.singleton = this;

    return this;
  }

  dashboard(timespan) {
    const body = new URLSearchParams();
    body.set('timespan', timespan);

    return super.get(`/api/v1/reports/dashboard?${body}`)
      .then(res => res.json())
      .then(json => json.result);
  }

  salesByProduct(groupBy, productId) {
    const body = new URLSearchParams();
    body.set('groupBy', groupBy);
    body.set('productId', productId);

    return super.get(`/api/v1/reports/salesByProduct?${body}`)
      .then(res => res.json())
      .then(json => json.report);
  }

  salesByTotal(groupBy) {
    const body = new URLSearchParams();
    body.set('groupBy', groupBy);

    return super.get(`/api/v1/reports/salesByTotal?${body}`)
      .then(res => res.json())
      .then(json => json.report);
  }

  salesByVendor(groupBy, vendorId) {
    const body = new URLSearchParams();
    body.set('groupBy', groupBy);
    body.set('vendorId', vendorId);

    return super.get(`/api/v1/reports/salesByVendor?${body}`)
      .then(res => res.json())
      .then(json => json.report);
  }

}

export default ReportApi;
