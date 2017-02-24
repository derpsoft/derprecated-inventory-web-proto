import crud from 'actions/crud';
import Api from 'services/imageApi';

const BASE = crud('image', Api);

const Actions = {
  INITIAL_STATE: {
    images: BASE.INITIAL_STATE,
  },
  ACTIONS: BASE.ACTIONS,
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
