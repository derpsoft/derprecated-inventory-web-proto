// @flow
import { Vendor as VendorApi } from 'derp-api';
import crud from './crud';

const BASE = crud('vendor', VendorApi);

const Actions = {
  INITIAL_STATE: {
    vendors: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
