// @flow
import { Category as CategoryApi } from 'derp-api';
import crud from 'actions/crud';

const BASE = crud('category', CategoryApi);

const Actions = {
  INITIAL_STATE: {
    categories: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
