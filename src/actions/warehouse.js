// @flow
import crud from './crud';
import WarehouseApi from '../services/warehouseApi';

const BASE = crud('warehouse', WarehouseApi);

const Actions = {
  INITIAL_STATE: {
    warehouses: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
