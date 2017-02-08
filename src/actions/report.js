import log from 'loglevel';
import moment from 'moment';
import Vue from 'vue';
import Constants from 'src/constants';
import ReportApi from 'services/reportApi';

function dashboard({
  commit
}, {
  timespan
}) {
  new ReportApi()
    .dashboard(timespan)
    .then(report => commit(Constants.SET_DASHBOARD_REPORT, report))
    .catch(e => log.error(e));
}

function salesByProduct({
  commit
}, {
  groupBy,
  productId,
}) {
  new ReportApi()
    .salesByProduct(groupBy, productId)
    .then((reports) => {
      commit(Constants.SET_SALES_BY_PRODUCT, reports);
    })
    .catch(e => log.error(e));
}

function salesByTotal({
  commit
}, {
  groupBy
}) {
  new ReportApi()
    .salesByTotal(groupBy)
    .then((reports) => {
      commit(Constants.SET_SALES_BY_TOTAL, reports);
    })
    .catch(e => log.error(e));
}

function salesByVendor({
  commit
}, {
  groupBy,
  vendorId,
}) {
  new ReportApi()
    .salesByVendor(groupBy, vendorId)
    .then((reports) => {
      commit(Constants.SET_SALES_BY_VENDOR, reports);
    })
    .catch(e => log.error(e));
}

function toChartData(results) {
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
      dispatched: 0,
      received: 0,
      totalSales: 0.0,
    },
  },
};

const ACTIONS = {
  [Constants.GET_SALES_BY_PRODUCT]: salesByProduct,
  [Constants.GET_SALES_BY_TOTAL]: salesByTotal,
  [Constants.GET_SALES_BY_VENDOR]: salesByVendor,
  [Constants.GET_DASHBOARD]: dashboard,
};

const MUTATIONS = {
  [Constants.SET_SALES_BY_PRODUCT]: (state, results) => {
    const dat = toChartData(results);

    state.reports.salesByTotal = {
      data: dat.data,
      labels: dat.labels,
    };
  },
  [Constants.SET_SALES_BY_TOTAL]: (state, results) => {
    const dat = toChartData(results);

    state.reports.salesByTotal = {
      data: dat.data,
      labels: dat.labels,
    };
  },
  [Constants.SET_SALES_BY_VENDOR]: (state, results) => {
    const dat = toChartData(results);

    state.reports.salesByTotal = {
      data: dat.data,
      labels: dat.labels,
    };
  },
  [Constants.SET_DASHBOARD_REPORT]: (state, result) => {
    Vue.set(state.reports, 'dashboard', {
      ...result,
      received: parseInt(result.received, 10),
      dispatched: parseInt(result.dispatched, 10),
      totalSales: parseFloat(result.totalSales, 10),
    });
  },
};

const GETTERS = {
  salesByProduct: state => state.reports.salesByProduct,
  salesByTotal: state => state.reports.salesByTotal,
  salesByVendor: state => state.reports.salesByVendor,
  dashboard: state => state.reports.dashboard,
};

const ReportActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ReportActions;
