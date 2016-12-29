import log from 'loglevel';
import moment from 'moment';
import Constants from '../constants';
import ReportApi from '../services/reportApi';

function salesByTotal ({ commit }, { groupBy }) {
  new ReportApi()
    .salesByTotal(groupBy)
    .then((reports) => {
      commit(Constants.SET_SALES_BY_TOTAL, reports);
    })
    .catch(e => log.error(e));
}

const INITIAL_STATE = {
  reports: {
    salesByTotal: {
      labels: [],
      data: [],
    },
  },
};

const ACTIONS = {
  [Constants.GET_SALES_BY_TOTAL]: salesByTotal,
};

const MUTATIONS = {
  [Constants.SET_SALES_BY_TOTAL]: (state, results) => {
    const dat = {
      labels: [],
      data: [],
    };

    Object.keys(results).forEach((key) => {
      dat.labels.push(moment(key).format('MM/DD/YYYY'));
      dat.data.push(results[key]);
    });

    state.reports.salesByTotal = {
      data: dat.data,
      labels: dat.labels,
    };
  },
};

const GETTERS = {
  salesByTotal(state) {
    return state.reports.salesByTotal;
  }
};

const ReportActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ReportActions;
