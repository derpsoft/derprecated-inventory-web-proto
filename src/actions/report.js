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

    salesByUser: 0,
    revenueByUser: 0,
    listingCountByUser: 0,
    inventoryShippedByUser: 0,
    inventoryReceivedByUser: 0,
  },
};

const ACTIONS = {
  [Constants.GET_SALES_BY_PRODUCT]: salesByProduct,
  [Constants.GET_SALES_BY_TOTAL]: salesByTotal,
  [Constants.GET_SALES_BY_VENDOR]: salesByVendor,
  [Constants.GET_DASHBOARD]: dashboard,

  [Constants.GET_DASHBOARD_INVENTORY_RECEIVED_BY_USER]: ({
    commit
  }) => {
    const api = new Api();
    return api.inventoryReceivedByUser()
      .then(() => {
        commit(Constants.SET_DASHBOARD_INVENTORY_RECEIVED_BY_USER);
      });
  },
  [Constants.GET_DASHBOARD_INVENTORY_SHIPPED_BY_USER]: ({
    commit
  }) => {
    const api = new Api();
    return api.inventoryShippedByUser()
      .then(() => {
        commit(Constants.SET_DASHBOARD_INVENTORY_SHIPPED_BY_USER);
      });
  },

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

  [Constants.SET_DASHBOARD_SALES_BY_USER]: (state: Object, count: number) => {
    state.salesByUser = count;
  },
  [Constants.SET_DASHBOARD_REVENUE_BY_USER]: (state: Object, count: number) => {
    state.revenueByUser = count;
  },
  [Constants.SET_DASHBOARD_LISTINGS_BY_USER]: (state: Object, count: number) => {
    state.listingCountByUser = count;
  },
  [Constants.SET_DASHBOARD_INVENTORY_SHIPPED_BY_USER]: (state: Object, count: number) => {
    state.inventoryShippedByUser = count;
  },
  [Constants.SET_DASHBOARD_INVENTORY_RECEIVED_BY_USER]: (state: Object, count: number) => {
    state.inventoryReceivedByUser = count;
  },

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

  salesByUser: (state: Object) => (): number => state.reports.salesByUser,
  revenueByUser: (state: Object) => (): number => state.reports.revenueByUser,
  listingCountByUser: (state: Object) => (): number => state.reports.listingCountByUser,

  inventoryShippedByUser: (state: Object) => (): number => state.reports.inventoryShippedByUser,
  inventoryReceivedByUser: (state: Object) => (): number => state.reports.inventoryReceivedByUser,
};

const ReportActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ReportActions;
