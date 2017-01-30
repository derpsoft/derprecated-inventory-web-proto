import log from 'loglevel';
import _ from 'lodash';
import Vue from 'vue';
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
    .then(response => commit(Constants.SET_CATEGORIES, response))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Categories.'
      });
      log.error(e);
    });
}

const typeahead = _.throttle(({
  dispatch,
  commit,
}, {
  query
}) => {
  new CategoryApi()
    .typeahead(query)
    .then(categories => commit(Constants.SET_CATEGORY_SEARCH_RESULTS, categories))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching for Categories.'
      });
      log.error(e);
    });
}, 800, {
  leading: false,
  trailing: true,
});

const INITIAL_STATE = {
  categories: {
    all: {},
    search: {
      results: [],
      query: {},
    },
    count: 0,
  }
};

const ACTIONS = {
  [Constants.GET_CATEGORY]: getCategory,
  [Constants.GET_CATEGORIES]: getCategories,
  [Constants.CREATE_CATEGORY]: createCategory,
  [Constants.SAVE_CATEGORY]: saveCategory,
  [Constants.COUNT_CATEGORIES]: countCategories,
  [Constants.SEARCH_CATEGORIES_WITH_TYPEAHEAD]: typeahead,
};

const MUTATIONS = {
  [Constants.SET_CATEGORIES]: (state, results) => {
    state.categories.all = _.merge({},
      state.categories.all,
      _.keyBy(results, x => x.id)
    );
  },
  [Constants.SET_CATEGORY]: (state, result) => {
    if (state.categories.all[result.id]) {
      state.categories.all[result.id] = _.merge({}, state.categories.all[result.id], result);
    } else {
      Vue.set(state.categories.all, result.id, result);
    }
  },
  [Constants.SET_CATEGORY_COUNT]: (state, count) => {
    state.categories.count = count;
  },
  [Constants.SET_CATEGORY_SEARCH_RESULTS]: (state, results) => {
    state.categories.search.results = results;
  },
};

const GETTERS = {
  categories: state => _.values(state.categories.all),
  categoryCount: state => state.categories.count,
  category: state => id => state.categories.all[id],
  categorySearch: state => state.categories.search.results,
};

const CategoryActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default CategoryActions;
