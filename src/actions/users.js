import Constants from '../constants';
import UsersApi from '../services/usersApi';

function getUsers({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new UsersApi().list(skip, take)
  .then(users => {
    commit(Constants.SET_USERS, users);
  });
}

const INITIAL_STATE = {
  users: {
    search: {
      query: {},
      results: {}
    },
    list: [],
    user: {},
    count: 0,
  }
};

const ACTIONS = {
  [Constants.GET_USERS]: getUsers,
};

const MUTATIONS = {
  [Constants.SET_USERS_SEARCH_QUERY]: (state, query) => {
    state.users.search.query = query;
  },
  [Constants.SET_USERS_SEARCH_RESULTS]: (state, results) => {
    state.users.search.results = results;
  },
  [Constants.CLEAR_USERS_SEARCH]: (state) => {
    state.users.search = {
      query: {},
      results: {},
    };
  },
  [Constants.SET_USERS]: (state, results) => {
    state.users.list = results.users;
    state.users.count = results.count;
  },
};

const GETTERS = {
  users: state => {
    return state.users;
  },
};

const UsersActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default UsersActions;
