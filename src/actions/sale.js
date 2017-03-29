// @flow
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
  mySales: () : number => Math.random(0, 30),
  myRevenue: () : number => Math.random(0, 30),
  activeListings: () : number => Math.random(0, 30),
};

const SaleActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default SaleActions;
