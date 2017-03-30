// @flow
import { Warehouse as WarehouseApi } from 'derp-api';
import crud from './crud';

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
