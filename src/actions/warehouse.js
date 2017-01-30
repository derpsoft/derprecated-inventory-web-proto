import log from 'loglevel';
import _ from 'lodash';
import Vue from 'vue';
import Constants from '../constants';
import WarehouseApi from '../services/warehouseApi';

function getWarehouse({
  dispatch,
  commit
}, {
  id
}) {
  new WarehouseApi()
    .single(id)
    .then(warehouse => commit(Constants.SET_WAREHOUSE, warehouse))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Warehouse.'
      });
      log.error(e);
    });
}

function createWarehouse({
  dispatch,
  commit
}, {
  warehouse,
  redirect,
}) {
  new WarehouseApi()
    .create(warehouse)
    .then((w) => {
      commit(Constants.SET_WAREHOUSE, w);
      if (typeof redirect === 'function') {
        redirect.apply();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Creating Warehouses.'
      });
      log.error(e);
    });
}

function saveWarehouse({
  dispatch,
  commit
}, {
  warehouse
}) {
  new WarehouseApi()
    .save(warehouse)
    .then((w) => {
      commit(Constants.SET_WAREHOUSE, w);
      dispatch(Constants.SHOW_TOASTR, {
        type: 'success',
        message: 'Successfully Saved Warehouses.'
      });
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Saving Warehouses.'
      });
      log.error(e);
    });
}

function getWarehouses({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new WarehouseApi()
    .list(skip, take)
    .then(warehouses => commit(Constants.SET_WAREHOUSES, warehouses))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Warehouses.'
      });
      log.error(e);
    });
}

const typeahead = _.throttle(({
  dispatch,
  commit
}, {
  query
}) => {
  new WarehouseApi()
    .typeahead(query)
    .then(warehouses => commit(Constants.SET_WAREHOUSE_SEARCH_RESULTS, warehouses))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching Warehouses.'
      });
      log.error(e);
    });
}, 800, {
  leading: false,
  trailing: true,
});

function countWarehouses({
  dispatch,
  commit
}) {
  new WarehouseApi()
    .count()
    .then(count => commit(Constants.SET_WAREHOUSE_COUNT, count))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Setting Warehouse Counts.'
      });
      log.error(e);
    });
}


const INITIAL_STATE = {
  warehouses: {
    all: {},
    count: 0,
    search: {
      results: {},
      query: {},
    },
  }
};

const ACTIONS = {
  [Constants.GET_WAREHOUSE]: getWarehouse,
  [Constants.GET_WAREHOUSES]: getWarehouses,
  [Constants.CREATE_WAREHOUSE]: createWarehouse,
  [Constants.SAVE_WAREHOUSE]: saveWarehouse,
  [Constants.SEARCH_WAREHOUSES_WITH_TYPEAHEAD]: typeahead,
  [Constants.COUNT_WAREHOUSES]: countWarehouses,
};

const MUTATIONS = {
  [Constants.SET_WAREHOUSES]: (state, results) => {
    state.warehouses.all = _.merge({},
      state.warehouses.all,
      _.keyBy(results, x => x.id)
    );
  },
  [Constants.SET_WAREHOUSE]: (state, result) => {
    if (state.warehouses.all[result.id]) {
      state.warehouses.all[result.id] = _.merge({}, state.warehouses.all[result.id], result);
    } else {
      Vue.set(state.warehouses.all, result.id, result);
    }
  },
  [Constants.SET_WAREHOUSE_COUNT]: (state, count) => {
    state.warehouses.count = count;
  },
  [Constants.SET_WAREHOUSE_SEARCH_RESULTS]: (state, results) => {
    state.warehouses.search.results = results;
  },
};

const GETTERS = {
  warehouse: state => id => state.warehouses.all[id],
  warehouses: state => _.values(state.warehouses.all),
  warehouseCount: state => state.warehouses.count,
  warehouseSearch: state => state.warehouses.search.results,
};

const WarehouseActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default WarehouseActions;
