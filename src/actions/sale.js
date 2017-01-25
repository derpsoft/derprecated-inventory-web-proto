import log from 'loglevel';
import _ from 'lodash';
import Constants from '../constants';
import SaleApi from '../services/saleApi';

function logSale({
  commit
}, {
  sale,
  redirect
}) {
  new SaleApi()
    .create(sale)
    .then((x) => {
      commit(Constants.SET_SALE, x);
      if (typeof redirect === 'function') {
        redirect();
      }
    })
    .catch(e => log.error(e));
}

function list({
  commit
}, {
  skip = 0,
  take = 25,
}) {
  new SaleApi()
    .list(skip, take)
    .then(x => commit(Constants.SET_SALE_LIST, x))
    .catch(e => log.error(e));
}

function count({
  commit
}) {
  new SaleApi()
    .count()
    .then(x => commit(Constants.SET_SALE_COUNT, x))
    .catch(e => log.error(e));
}

function search({
  commit
}, {
  query
}) {
  new SaleApi()
    .typeahead(query)
    .then(x => commit(Constants.SET_SALE_SEARCH_RESULTS, x))
    .catch(e => log.error(e));
}

const INITIAL_STATE = {
  sales: {
    all: {},
    searchResults: {},
    count: 0,
  }
};

const ACTIONS = {
  [Constants.CREATE_SALE]: logSale,
  [Constants.GET_SALES]: list,
  [Constants.SEARCH_SALES_WITH_TYPEAHEAD]: search,
  [Constants.COUNT_SALES]: count,
};

const MUTATIONS = {
  [Constants.SET_SALE_LIST]: (state, sales) => {
    state.sales.all = _.merge({}, state.sales.all, _.keyBy(sales, x => x.id));
  },
  [Constants.SET_SALE_SEARCH_RESULTS]: (state, results) => {
    state.sales.results = results;
  },
  [Constants.SET_SALE_COUNT]: (state, c) => {
    state.sales.count = c;
  }
};

const GETTERS = {
  sale: state => id => state.sales.all[id],
  sales: state => _.values(state.sales.all),
  saleSearch: state => state.sales.searchResults,
  saleCount: state => state.sales.count,
};

const SaleActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default SaleActions;
