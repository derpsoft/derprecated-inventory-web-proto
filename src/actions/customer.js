// @flow
import crud from 'actions/crud';
import { Customer as CustomerApi } from 'derp-api';

const BASE = crud('customer', CustomerApi);

const Actions = {
  INITIAL_STATE: {
    customers: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
