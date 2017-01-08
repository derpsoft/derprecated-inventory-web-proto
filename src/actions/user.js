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
    .then((response) => {
      commit(Constants.SET_USERS, response.users);
    });
}

function searchUsersWithTypeahead({
  dispatch,
  commit
}, {
  query
}) {
  new UsersApi().typeahead(query)
    .then(response => commit(Constants.SET_USERS, response.users))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error searching for users.'
      });
      log.error(e);
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
    .then((response) => {
      commit(Constants.SET_USERS, response.users);
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Users.'
      });
      log.error(e);
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
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Retrieving User.'
      });
      log.error(e);
    });
}

function saveUser({
  dispatch,
  commit
}, {
  user
}) {
  new UsersApi()
    .save(user)
    .then((response) => {
      commit(Constants.SET_USER, response.user);
      dispatch(Constants.SHOW_TOASTR, {
        type: 'success',
        message: 'Successfully Saving User.'
      });
    })
    .catch((e) => {
      log.error(e);
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Saving User.'
      });
    });
}

function createUser({
  dispatch,
  commit
}, {
  user,
  redirect
}) {
  new UsersApi().create(user)
    .then((response) => {
      commit(Constants.SET_USER, response.user);

      if (typeof redirect === 'function') {
        redirect.apply();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Creating User.'
      });
      log.error(e);
    });
}

const INITIAL_STATE = {
  users: {
    list: [],
    user: {},
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
  [Constants.SET_USERS]: (state, results) => {
    state.users.list = results;
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
