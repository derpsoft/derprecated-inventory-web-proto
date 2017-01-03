import log from 'loglevel';
import Constants from '../constants';
import SaleApi from '../services/saleApi';

function logSale({
  commit
}, sale) {
  new SaleApi()
    .log(sale)
    .catch(e => log.error(e));
}

const INITIAL_STATE = {
  sales: {}
};

const ACTIONS = {
  [Constants.LOG_SALE]: logSale,
};

const MUTATIONS = {};

const GETTERS = {};

const SaleActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default SaleActions;
