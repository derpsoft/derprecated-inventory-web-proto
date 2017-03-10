import crud from 'actions/crud';
import OrderApi from 'services/orderApi';

const BASE = crud('order', OrderApi);

const Actions = {
  INITIAL_STATE: {
    orders: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
