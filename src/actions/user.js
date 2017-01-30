import log from 'loglevel';
import _ from 'lodash';
import Vue from 'vue';
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
      commit(Constants.SET_USERS_SEARCH_RESULTS, response.users);
    });
}

const searchUsersWithTypeahead = _.throttle(({
  dispatch,
  commit
}, {
  query
}) => {
  new UsersApi().typeahead(query)
    .then(response => commit(Constants.SET_USERS_SEARCH_RESULTS, response.users))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error searching for users.'
      });
      log.error(e);
    });
}, 800, {
  leading: false,
  trailing: true,
});

function getUsers({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25,
  includeDeleted = false,
  toastError = true,
}) {
  new UsersApi().list(skip, take, includeDeleted)
    .then((response) => {
      commit(Constants.SET_USERS, response.users);
    })
    .catch((e) => {
      if (toastError) {
        dispatch(Constants.SHOW_TOASTR, {
          type: 'error',
          message: 'Error Getting Users.'
        });
      }
      log.error(e);
    });
}

function getUser({
  dispatch,
  commit
}, {
  id,
  includeDeleted = false,
  toastError = true,
}) {
  new UsersApi().singleById(id, includeDeleted)
    .then(response => commit(Constants.SET_USER, response.user))
    .catch((e) => {
      if (toastError) {
        dispatch(Constants.SHOW_TOASTR, {
          type: 'error',
          message: 'Error Retrieving User.'
        });
      }
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
    all: {},
    search: {
      query: {},
      results: {},
    },
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
  [Constants.SET_USERS]: (state, results) => {
    state.users.all = _.merge({},
      state.users.all,
      _.keyBy(results, x => x.id)
    );
  },
  [Constants.SET_USER]: (state, result) => {
    if (state.users.all[result.id]) {
      state.users.all[result.id] = _.merge({}, state.users.all[result.id], result);
    } else {
      Vue.set(state.users.all, result.id, result);
    }
  },
  [Constants.SET_USERS_SEARCH_RESULTS]: (state, results) => {
    state.users.search.results = results;
  },
};

const GETTERS = {
  users: state => _.values(state.users.all),
  user: state => id => state.users.all[id],
  userSearch: state => state.users.search.results,
};

const UsersActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default UsersActions;
