import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class ReportApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (ReportApi.prototype.singleton) {
      return ReportApi.prototype.singleton;
    }
    ReportApi.prototype.singleton = this;

    return this;
  }

  salesByTotal(groupBy) {
    const body = new URLSearchParams();
    body.set('groupBy', groupBy);

    return super.get(`/api/v1/reports/salesByTotal?${body}`)
      .then(res => res.json())
      .then((json) => {
        return json.report;
      });
  }
}

export default ReportApi;
