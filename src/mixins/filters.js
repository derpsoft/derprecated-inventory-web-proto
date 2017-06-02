// @flow
import moment from 'moment';
import _ from 'lodash';
import config from 'root/config';

const filters = {
  formatDate(x) {
    return moment.utc(x)
      .local()
      .format('LL');
  },
  formatDateTime(x: string): string {
    return moment.utc(x)
      .local()
      .format('lll');
  },
  formatOrderNumber(x) {
    return `${config.app.orderPrefix}-${x}`;
  },
  formatCurrency(x: number) {
    // $FlowFixMe
    return Intl
      .NumberFormat('en-US', {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'USD',
      })
      .format(x);
  },
  truncate(x: string, length: number = 50) {
    return _.truncate(x, {
      length
    });
  },
  ago(x: string) {
    return moment.utc(x).fromNow();
  },
  toSsl(src: string = '') {
    return src.replace('http:', 'https:');
  },
};

export default (Vue: Object) => {
  Vue.mixin({
    filters
  });
};
