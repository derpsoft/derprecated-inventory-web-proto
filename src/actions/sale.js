import SaleApi from 'services/saleApi';
import crud from 'actions/crud';

const BASE = crud('sale', SaleApi);

const INITIAL_STATE = {
  sales: BASE.INITIAL_STATE,
};

const ACTIONS = {
  ...BASE.ACTIONS,
};

const MUTATIONS = {
  ...BASE.MUTATORS,
};

const GETTERS = {
  ...BASE.GETTERS,
};

const SaleActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default SaleActions;
