import crud from './crud';
import UserApi from '../services/userApi';

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
