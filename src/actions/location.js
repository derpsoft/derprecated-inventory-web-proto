import crud from 'actions/crud';
import LocationApi from 'services/locationApi';

const BASE = crud('location', LocationApi);

const Actions = {
  INITIAL_STATE: {
    locations: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
