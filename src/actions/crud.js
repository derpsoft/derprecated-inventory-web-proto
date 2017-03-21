/*
 This file contains a generator for default/template actions of CRUD operations.

 They all may be overridden in the implementing class.
*/

import _ from 'lodash';
import inflection from 'lodash-inflection';
import log from 'loglevel';
import Vue from 'vue';
import Constants from 'src/constants';
import {
  FetchError
} from 'src/errors';

_.mixin(inflection);

const t = Constants.fluxTemplates;

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

  Constants.addFluxCrud(name);

  const INITIAL_STATE = {
    all: {},
    search: {
      results: [],
      query: '',
    },
    errors: {},
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

    [t.CLEAR_ERRORS(name)]: ({
      commit
    }) => {
      commit(t.CLEAR_ERRORS(name));
    },

    [t.CLEAR_SEARCH(name)]: ({
      commit
    }) => {
      commit(t.CLEAR_SEARCH(name));
    },

    [t.CREATE_ONE(name)]: _.debounce(
      ({
        commit,
        dispatch,
      }, args) => {
        const api = new Api();

        return api.create(args[one])
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
      5000, {
        leading: true,
        trailing: false,
      }),

    [t.CREATE_MANY(name)]: _.throttle(
      ({
        commit,
        dispatch
      }, args) => {
        const api = new Api();

        commit(t.CLEAR_ERRORS(name));
        return api.createMany(args.products)
          .then(x => commit(t.SET_MANY(name), x))
          .catch((e) => {
            createErrorHandler({
              dispatch,
              toastError: args.toastError,
              message: `Error creating one or more ${many}.`,
            })(e);
            if (e instanceof FetchError && e.contentType === 'application/json' && e.body) {
              commit(t.SET_ERRORS(name), e);
            }
          });
      },
      10000, {
        leading: true,
        trailing: false,
      }),

    [t.UPDATE_ONE(name)]: _.debounce(
      ({
        commit,
        dispatch
      }, args) => {
        const api = new Api();

        api.save(args[one])
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
      5000, {
        leading: true,
        trailing: false,
      }),

    [t.DELETE_ONE(name)]: _.debounce(
      ({
        commit,
        dispatch
      }, {
        id,
        rowVersion,
        redirect = null,
        toastError = true,
      }) => {
        const api = new Api();

        api.delete(id, rowVersion)
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
      10000, {
        leading: true,
        trailing: false,
      }),
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

    [t.CLEAR_ERRORS(name)]: (state) => {
      state[many].errors = {};
    },

    [t.SET_ERROR(name)]: (state, x) => {
      state[many].errors[x.id] = x;
    },

    [t.SET_ERRORS(name)]: (state, x) => {
      state[many].errors = _.merge({},
        state[many].errors,
        _.keyBy(x, xx => xx.id)
      );
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
