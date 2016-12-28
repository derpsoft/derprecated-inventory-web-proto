import log from 'loglevel';
import Constants from '../constants';
import UsersApi from '../services/usersApi';

function searchUsers({
  dispatch,
  commit
}, {
  searchTerm
}) {
  new UsersApi().search(searchTerm)
  .then((users) => {
    commit(Constants.SET_USERS, users);
  });
}

function searchUsersWithTypeahead({ dispatch, commit }, { query }) {
  new UsersApi().typeahead(query)
  .then(response => commit(Constants.SET_USERS_SEARCH_RESULTS, response.users))
  .catch(e => log.error(e));
}

function getUsers({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new UsersApi().list(skip, take)
  .then((users) => {
    commit(Constants.SET_USERS, users);
  });
}

function getUser({
  dispatch,
  commit
}, {
  id
}) {
  new UsersApi().singleById(id)
    .then(response => commit(Constants.SET_USER, response.user))
    .catch(e => log.error(e));
}

function saveUser({ dispatch, commit }, { user }) {
  new UsersApi()
    .save(user)
    .then(response => commit(Constants.SET_USER, response.user))
    .catch(e => log.error(e));
}

function createUser({ dispatch, commit }, { user }) {
  new UsersApi().create(user)
    .then((response) => {
      commit(Constants.SET_USER, response.user);
    })
    .catch(e => log.error(e));
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
  [Constants.GET_USER]: getUser,
  [Constants.SAVE_USER]: saveUser,
  [Constants.SEARCH_USERS]: searchUsers,
  [Constants.CREATE_USER]: createUser,
  [Constants.SEARCH_USERS_WITH_TYPEAHEAD]: searchUsersWithTypeahead,
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
  [Constants.SET_USER]: (state, user) => {
    state.users.user = user;
  }
};

const GETTERS = {
  users(state) {
    return state.users.list;
  },
  user(state) {
    return state.users.user;
  }
};

const UsersActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default UsersActions;
