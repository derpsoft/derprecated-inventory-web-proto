import moment from 'moment';
import _ from 'lodash';
import config from 'root/config';

const filters = {
  formatDate(x) {
    return moment.utc(x)
      .local()
      .format('LL');
  },
  formatDateTime(x) {
    return moment.utc(x)
      .local()
      .format('lll');
  },
  formatOrderNumber(x) {
    return `${config.app.orderPrefix}-${x}`;
  },
  formatCurrency(x) {
    return Intl
      .NumberFormat('en-US', {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'USD',
      })
      .format(x);
  },
  truncate(x, length = 50) {
    return _.truncate(x, {
      length
    });
  },
  ago(x) {
    return moment(x).fromNow();
  },
};

export default (Vue) => {
  Vue.mixin({
    filters
  });
};
