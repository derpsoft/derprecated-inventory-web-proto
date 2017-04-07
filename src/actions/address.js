// @flow

import crud from 'actions/crud';
import { Address as AddressApi } from 'derp-api';

const BASE = crud('address', AddressApi);

const Actions = {
  INITIAL_STATE: {
    addresses: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
