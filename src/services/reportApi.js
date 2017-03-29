// @flow
import store from 'stores/store';
import Constants from 'src/constants';
import Fetchable from 'services/fetchable';

let singleton : any = null;

class ReportApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (singleton) {
      return singleton;
    }
    singleton = this;

    return singleton;
  }

  dashboard() : Promise<Object> {
    const body : any = new URLSearchParams();

    return super.get(`/api/v1/reports/dashboard?${body}`)
      .then(json => json.result);
  }

  salesByProduct(groupBy : string, productId : number) : Promise<Object> {
    const body : any = new URLSearchParams();
    body.set('groupBy', groupBy);
    body.set('productId', productId);

    return super.get(`/api/v1/reports/salesByProduct?${body}`)
      .then(json => json.report);
  }

  salesByTotal(groupBy : string) : Promise<Object> {
    const body : any = new URLSearchParams();
    body.set('groupBy', groupBy);

    return super.get(`/api/v1/reports/salesByTotal?${body}`)
      .then(json => json.report);
  }

  salesByVendor(groupBy : string, vendorId : number) : Promise<Object> {
    const body : any = new URLSearchParams();
    body.set('groupBy', groupBy);
    body.set('vendorId', vendorId);

    return super.get(`/api/v1/reports/salesByVendor?${body}`)
      .then(json => json.report);
  }
}

export default ReportApi;
