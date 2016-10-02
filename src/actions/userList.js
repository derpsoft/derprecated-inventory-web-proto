import Constants from '../constants';
import UserListApi from '../services/userListApi';

function getUserList({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new UserListApi().list(skip, take)
  .then(users => {
    commit(Constants.SET_USER_LIST, users);
  })
  .catch(e => {
    console.error(e);
  });
}


const INITIAL_STATE = {
  usersList: {
    search: {
      query: {},
      results: {}
    },
    list: [],
    user: {},
  }
};

const ACTIONS = {
  [Constants.GET_USER_LIST]: getUserList,
};

const MUTATIONS = {
  [Constants.SET_USER_LIST_SEARCH_QUERY]: (state, query) => {
    state.userList.search.query = query;
  },
  [Constants.SET_USER_LIST_SEARCH_RESULTS]: (state, results) => {
    state.usersList.search.results = results;
  },
  [Constants.CLEAR_USER_LIST_SEARCH]: (state) => {
    state.userList.search = {
      query: {},
      results: {},
    };
  },
  [Constants.SET_USER_LIST]: (state, results) => {
    state.usersList.list = results;
  },
};

const GETTERS = {
  users: state => {
    return state.users;
  },
};

const UserListActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default UserListActions;
