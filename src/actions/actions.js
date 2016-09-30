import Constants from '../constants';

const setUser = ({ dispatch }, user) => {
  dispatch(Constants.SET_USER, user);
};

export { setUser };
