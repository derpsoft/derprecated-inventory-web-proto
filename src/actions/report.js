import log from 'loglevel';
import moment from 'moment';
import Constants from '../constants';
import ReportApi from '../services/reportApi';

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
  },
};

const ACTIONS = {
  [Constants.GET_SALES_BY_PRODUCT]: salesByProduct,
  [Constants.GET_SALES_BY_TOTAL]: salesByTotal,
  [Constants.GET_SALES_BY_VENDOR]: salesByVendor,
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
};

const GETTERS = {
  salesByProduct(state) {
    return state.reports.salesByProduct;
  },
  salesByTotal(state) {
    return state.reports.salesByTotal;
  },
  salesByVendor(state) {
    return state.reports.salesByVendor;
  }
};

const ReportActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ReportActions;
