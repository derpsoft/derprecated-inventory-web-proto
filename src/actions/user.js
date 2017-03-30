// @flow
import crud from 'actions/crud';
import { User as UserApi } from 'derp-api';

const BASE = crud('user', UserApi);

const Actions = {
  INITIAL_STATE: {
    users: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
