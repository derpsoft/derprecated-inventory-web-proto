// @flow
import log from 'loglevel';
import moment from 'moment';
import _ from 'lodash';
import Vue from 'vue';
import Constants from 'src/constants';
import {
  Report as Api,
} from 'derp-api';

function dashboard({
  commit
}: Object, {
  timespan
}: Object): void {
  new Api()
    .dashboard(timespan)
    .then(report => commit(Constants.SET_DASHBOARD_REPORT, report))
    .catch(e => log.error(e));
}

function salesByProduct({
  commit
}: Object, {
  groupBy,
  productId,
}: Object): void {
  new Api()
    .salesByProduct(groupBy, productId)
    .then((reports) => {
      commit(Constants.SET_SALES_BY_PRODUCT, reports);
    })
    .catch(e => log.error(e));
}

function salesByTotal({
  commit
}: Object, {
  groupBy
}: Object): void {
  new Api()
    .salesByTotal(groupBy)
    .then((reports) => {
      commit(Constants.SET_SALES_BY_TOTAL, reports);
    })
    .catch(e => log.error(e));
}

function salesByVendor({
  commit
}: Object, {
  groupBy,
  vendorId,
}: Object): void {
  new Api()
    .salesByVendor(groupBy, vendorId)
    .then((reports) => {
      commit(Constants.SET_SALES_BY_VENDOR, reports);
    })
    .catch(e => log.error(e));
}

function toChartData(results: Object): Object {
  const dat = {
    labels: [],
    data: [],
  };

  Object.keys(results).forEach((key) => {
    dat.labels.push(moment(key).format('MM/DD/YYYY'));
    dat.data.push(results[key]);
  });

  return dat;
}

const INITIAL_STATE = {
  reports: {
    salesByProduct: {
      labels: [],
      data: [],
    },
    salesByTotal: {
      labels: [],
      data: [],
    },
    salesByVendor: {
      labels: [],
      data: [],
    },
    dashboard: {
      dispatched: {
        series: [],
        labels: [],
        total: 0,
      },
      received: {
        series: [],
        labels: [],
        total: 0,
      },
      sales: {
        series: [],
        labels: [],
        total: 0.00,
      },
    },
  },
};

const ACTIONS = {
  [Constants.GET_SALES_BY_PRODUCT]: salesByProduct,
  [Constants.GET_SALES_BY_TOTAL]: salesByTotal,
  [Constants.GET_SALES_BY_VENDOR]: salesByVendor,
  [Constants.GET_DASHBOARD]: dashboard,

  [Constants.GET_DASHBOARD_SALES_BY_USER]: ({
    commit
  }) => {
    const api = new Api();
    return api.salesByUser()
      .then(() => {
        commit(Constants.SET_DASHBOARD_SALES_BY_USER);
      });
  },

  [Constants.GET_DASHBOARD_REVENUE_BY_USER]: ({
    commit
  }) => {
    const api = new Api();
    return api.revenueByUser()
      .then(() => {
        commit(Constants.SET_DASHBOARD_REVENUE_BY_USER);
      });
  },

  [Constants.GET_DASHBOARD_LISTINGS_BY_USER]: ({
    commit
  }) => {
    const api = new Api();
    return api.listingsByUser()
      .then(() => {
        commit(Constants.SET_DASHBOARD_LISTINGS_BY_USER);
      });
  },
};

const MUTATIONS = {

  [Constants.SET_DASHBOARD_SALES_BY_USER]: () => {},
  [Constants.SET_DASHBOARD_REVENUE_BY_USER]: () => {},
  [Constants.SET_DASHBOARD_LISTINGS_BY_USER]: () => {},

  [Constants.SET_SALES_BY_PRODUCT]: (state: Object, results: Object): void => {
    const dat = toChartData(results);

    state.reports.salesByTotal = {
      data: dat.data,
      labels: dat.labels,
    };
  },
  [Constants.SET_SALES_BY_TOTAL]: (state: Object, results: Object): void => {
    const dat = toChartData(results);

    state.reports.salesByTotal = {
      data: dat.data,
      labels: dat.labels,
    };
  },
  [Constants.SET_SALES_BY_VENDOR]: (state: Object, results: Object): void => {
    const dat = toChartData(results);

    state.reports.salesByTotal = {
      data: dat.data,
      labels: dat.labels,
    };
  },
  [Constants.SET_DASHBOARD_REPORT]: (state: Object, result: Object): void => {
    const split = (src) => {
      const pairs = _.chain(src)
        .toPairs()
        .orderBy([x => x[0]], ['asc'])
        .unzip()
        .value();
      return {
        labels: pairs[0] || [],
        series: pairs[1] || [],
        total: _.sum(_.values(src)) || 0,
      };
    };

    Vue.set(state.reports, 'dashboard', {
      dispatched: split(result.dispatched),
      received: split(result.received),
      sales: split(result.sales),
    });
  },
};

const GETTERS = {
  salesByProduct: (state: Object): Object => state.reports.salesByProduct,
  salesByTotal: (state: Object): Object => state.reports.salesByTotal,
  salesByVendor: (state: Object): Object => state.reports.salesByVendor,
  dashboard: (state: Object): Object => state.reports.dashboard,

  salesByUser: (state: Object) => () : number => state.reports.salesByUser,
  revenueByUser: (state: Object) => (): number => state.reports.revenueByUser,
  listingCountByUser: (state: Object) => () : number => state.reports.listingCountByUser,
};

const ReportActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ReportActions;
