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
  new UsersApi().save(user)
    .then(response => commit(Constants.SET_USER, response.user))
    .catch(e => log.error(e));
}

function updateFirstName({
  dispatch,
  commit
}, {
  id,
  firstName
}) {
  new UsersApi().updateFirstName(id, firstName)
    .then((json) => {
      console.log(json);
    });
}

function updateLastName({
  dispatch,
  commit
}, {
  id,
  lastName
}) {
  new UsersApi().updateLastName(id, lastName)
    .then((json) => {
      console.log(json);
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
  [Constants.GET_USER]: getUser,
  [Constants.UPDATE_USER_FIRST_NAME]: updateFirstName,
  [Constants.UPDATE_USER_LAST_NAME]: updateLastName,
  [Constants.SAVE_USER]: saveUser,
  [Constants.SEARCH_USERS]: searchUsers,
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
