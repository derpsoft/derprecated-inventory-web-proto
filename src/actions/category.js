import log from 'loglevel';
import Constants from '../constants';
import CategoryApi from '../services/categoryApi';

function getCategory({
  dispatch,
  commit
}, {
  id
}) {
  new CategoryApi()
    .single(id)
    .then(category => commit(Constants.SET_CATEGORY, category))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Category.'
      });
      log.error(e);
    });
}

function createCategory({
  dispatch,
  commit
}, {
  category,
  redirect,
}) {
  new CategoryApi()
    .create(category)
    .then((res) => {
      commit(Constants.SET_CATEGORY, res.category);

      if (typeof redirect === 'function') {
        redirect.apply();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Creating Category.'
      });
      log.error(e);
    });
}

function countCategories({
  dispatch,
  commit
}) {
  new CategoryApi()
    .count()
    .then(res => commit(Constants.SET_CATEGORY_COUNT, res.count))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Setting Category Counts.'
      });
      log.error(e);
    });
}

function saveCategory({
  dispatch,
  commit
}, {
  category
}) {
  new CategoryApi()
    .save(category)
    .then((res) => {
      commit(Constants.SET_CATEGORY, res.category);

      dispatch(Constants.SHOW_TOASTR, {
        type: 'success',
        message: 'Successfully Saved Category.'
      });
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Saving Category.'
      });
      log.error(e);
    });
}

function getCategories({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new CategoryApi()
    .list(skip, take)
    .then(response => commit(Constants.SET_CATEGORY_LIST, response))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Categories.'
      });
      log.error(e);
    });
}

function search({
  dispatch,
  commit,
}, {
  query
}) {
  new CategoryApi()
    .search(query)
    .then(response => commit(Constants.SET_CATEGORY_LIST, response.results))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching for Categories.'
      });
      log.error(e);
    });
}

function typeahead({
  dispatch,
  commit,
}, {
  query
}) {
  new CategoryApi()
    .typeahead(query)
    .then(categories => commit(Constants.SET_CATEGORY_LIST, categories))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching for Categories.'
      });
      log.error(e);
    });
}

function clearCategory({
  commit
}) {
  commit(Constants.CLEAR_CATEGORY);
}


const INITIAL_STATE = {
  categories: {
    list: [],
    category: {},
    count: 0,
  }
};

const ACTIONS = {
  [Constants.GET_CATEGORY]: getCategory,
  [Constants.GET_CATEGORIES]: getCategories,
  [Constants.SEARCH_CATEGORIES]: search,
  [Constants.CLEAR_CATEGORY]: clearCategory,
  [Constants.CREATE_CATEGORY]: createCategory,
  [Constants.SAVE_CATEGORY]: saveCategory,
  [Constants.COUNT_CATEGORIES]: countCategories,
  [Constants.SEARCH_CATEGORIES_WITH_TYPEAHEAD]: typeahead,
};

const MUTATIONS = {
  [Constants.SET_CATEGORY_LIST]: (state, list) => {
    state.categories.list = list;
  },
  [Constants.SET_CATEGORY]: (state, results) => {
    state.categories.category = results;
  },
  [Constants.SET_CATEGORY_COUNT]: (state, count) => {
    state.categories.count = count;
  },
  [Constants.CLEAR_CATEGORY]: (state) => {
    state.categories.category = {};
  },
};

const GETTERS = {
  categories(state) {
    return state.categories.list;
  },
  categoryCount(state) {
    return state.categories.count;
  },
  category(state) {
    return state.categories.category;
  },
};

const CategoryActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default CategoryActions;
