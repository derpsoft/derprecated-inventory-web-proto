import Constants from '../constants';

export function setUser({ dispatch }, user) => {
  dispatch(Constants.SET_USER, user);
};

export function

export const INITIAL_STATE = {
  user: {
    user: {
      isAuthenticated: false,
      userName: null,
      sessionId: null,
      userId: null,
    }
  }
};

export const MUTATIONS = {
  [SET_USER]: (state, user) => {
    state.user = user;
  },
};

export { setUser };
