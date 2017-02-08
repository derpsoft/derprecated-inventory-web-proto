/*
 This file contains a generator for default/template actions of CRUD operations.

 They all may be overridden in the implementing class.
*/

import _ from 'lodash';
import inflection from 'lodash-inflection';
import log from 'loglevel';
import Vue from 'vue';
import Constants from 'src/constants';

_.mixin(inflection);

/*
  Convenience templaters for the constants corresponding to actions/mutations.
 */
const t = {
  CLEAR_SEARCH_RESULTS: x => `CLEAR_${_(x).singularize().toUpper()}_SEARCH_RESULTS`,
  CLEAR_SEARCH: x => `CLEAR_${_(x).singularize().toUpper()}_SEARCH`,
  CREATE_ONE: x => `CREATE_${_(x).singularize().toUpper()}`,
  CREATE_MANY: x => `CREATE_${_(x).pluralize().toUpper()}`,
  COUNT: x => `COUNT_${_(x).pluralize().toUpper()}`,
  UPDATE_ONE: x => `UPDATE_${_(x).singularize().toUpper()}`,
  DELETE_ONE: x => `DELETE_${_(x).singularize().toUpper()}`,
  GET_MANY: x => `GET_${_(x).pluralize().toUpper()}`,
  GET_ONE: x => `GET_${_(x).singularize().toUpper()}`,
  SET_MANY: x => `SET_${_(x).pluralize().toUpper()}`,
  SET_ONE: x => `SET_${_(x).singularize().toUpper()}`,
  SET_COUNT: x => `SET_${_(x).pluralize().toUpper()}_COUNT`,
  SET_SEARCH_QUERY: x => `SET_${_(x).singularize().toUpper()}_SEARCH_QUERY`,
  SET_SEARCH_RESULTS: x => `SET_${_(x).singularize().toUpper()}_SEARCH_RESULTS`,
  SEARCH: x => `SEARCH_${_(x).pluralize().toUpper()}`,
};

function toast({
  dispatch,
  type,
  message
}) {
  dispatch(Constants.SHOW_TOASTR, {
    type,
    message
  });
}

function toastSuccess(args) {
  toast({
    ...args,
    type: 'success',
  });
}

function toastInfo(args) {
  toast({
    ...args,
    type: 'info',
  });
}

function createErrorHandler({
  dispatch,
  toastError = false,
  message
}) {
  return (e) => {
    if (toastError) {
      toast({
        dispatch,
        type: 'error',
        message,
      });
    }
    log.error(e);
  };
}

export default function(name, Api) {
  const one = _(name).singularize().toLower();
  const many = _(one).pluralize();

  const INITIAL_STATE = {
    all: {},
    search: {
      results: [],
      query: '',
    },
    count: 0,
  };

  const GETTERS = {
    [one]: state => id => state[many].all[id],

    [many]: state => _.values(state[many].all),

    [`${one}Search`]: state => state[many].search.results,

    [`${one}Count`]: state => state[many].count,
  };

  const ACTIONS = {
    [t.GET_ONE(name)]: ({
      commit,
      dispatch
    }, {
      id,
      toastError = true,
      includeDeleted = false,
    }) => {
      return new Api()
        .single(id, includeDeleted)
        .then(x => commit(t.SET_ONE(name), x))
        .catch(createErrorHandler({
          dispatch,
          toastError,
          message: `Error loading ${one}.`
        }));
    },

    [t.GET_MANY(name)]: ({
      commit,
      dispatch
    }, {
      skip,
      take,
      toastError = true,
      includeDeleted = false,
    }) => {
      return new Api()
        .list(skip, take, includeDeleted)
        .then(x => commit(t.SET_MANY(name), x))
        .catch(createErrorHandler({
          dispatch,
          toastError,
          message: `Error loading ${many}.`
        }));
    },

    [t.COUNT(name)]: ({
      commit,
      dispatch
    }, {
      toastError = true,
      includeDeleted = false,
    }) => {
      return new Api()
        .count(includeDeleted)
        .then(x => commit(t.SET_COUNT(name), x))
        .catch(createErrorHandler({
          dispatch,
          toastError,
          message: `Error counting ${many}`,
        }));
    },

    [t.SEARCH(name)]: _.throttle(
      ({
        commit,
        dispatch
      }, {
        query,
        includeDeleted = false,
      }) => {
        return new Api()
          .typeahead(query, includeDeleted)
          .then(x => commit(t.SET_SEARCH_RESULTS(name), x))
          .catch(createErrorHandler({
            dispatch
          }));
      },
      200, {
        leading: false,
        trailing: true
      }
    ),

    [t.CLEAR_SEARCH(name)]: ({
      commit
    }) => {
      commit(t.CLEAR_SEARCH(name));
    },

    [t.CREATE_ONE(name)]: ({
      commit,
      dispatch
    }, args) => {
      new Api()
        .create(args[one])
        .then((x) => {
          commit(t.SET_ONE(name), x);
          toastSuccess({
            dispatch,
            message: `Created ${name} successfully.`
          });
          if (args.redirect) {
            args.redirect();
          }
        })
        .catch(createErrorHandler({
          dispatch,
          toastError: args.toastError,
          message: `Error creating ${one}.`
        }));
    },

    [t.CREATE_MANY(name)]: ({
      commit,
      dispatch
    }, args) => {
      const api = new Api();

      return Promise.all(
          _.map(args[many], (single) => {
            return api
              .create(single)
              .then(x => commit(t.SET_ONE(name), x));
          }))
        .then((results) => {
          toastSuccess({
            dispatch,
            message: `Created ${results.length} ${many} successfully.`
          });
          if (args.redirect) {
            args.redirect();
          }
        })
        .catch(createErrorHandler({
          dispatch,
          toastError: args.toastError,
          message: `Error creating one or more ${many}.`,
        }));
    },

    [t.UPDATE_ONE(name)]: ({
      commit,
      dispatch
    }, args) => {
      new Api()
        .save(args[one])
        .then((x) => {
          commit(t.SET_ONE(name), x);
          toastSuccess({
            dispatch,
            message: `Saved ${name} successfully.`
          });
        })
        .catch(createErrorHandler({
          dispatch,
          toastError: args.toastError,
          message: `Error saving ${one}.`
        }));
    },

    [t.DELETE_ONE(name)]: ({
      commit,
      dispatch
    }, {
      id,
      redirect = null,
      toastError = true,
    }) => {
      new Api()
        .delete(id)
        .then(() => {
          commit(t.DELETE_ONE(name), id);
          toastInfo({
            dispatch,
            message: `Deleted ${one}.`
          });

          if (redirect) {
            redirect();
          }
        })
        .catch(createErrorHandler({
          dispatch,
          toastError,
          message: `Error deleting ${one}`
        }));
    },
  };

  const MUTATORS = {
    [t.SET_ONE(name)]: (state, x) => {
      if (state[many].all[x.id]) {
        state[many].all[x.id] = _.merge({}, state[many].all[x.id], x);
      } else {
        Vue.set(state[many].all, x.id, x);
      }
    },

    [t.SET_MANY(name)]: (state, x) => {
      state[many].all = _.merge({},
        state[many].all,
        _.keyBy(x, xx => xx.id)
      );
    },

    [t.DELETE_ONE(name)]: (state, x) => {
      delete state[many].all[x];
    },

    [t.SET_SEARCH_QUERY(name)]: (state, x) => {
      state[many].search.query = x;
    },

    [t.SET_SEARCH_RESULTS(name)]: (state, x) => {
      state[many].search.results = x;
    },

    [t.CLEAR_SEARCH(name)]: (state) => {
      state[many].search.results = [];
      state[many].search.query = '';
    },
  };

  return {
    INITIAL_STATE,
    GETTERS,
    ACTIONS,
    MUTATORS,
  };
}
