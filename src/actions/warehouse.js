import log from 'loglevel';
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
  warehouse
}) {
  new WarehouseApi()
    .create(warehouse)
    .then((w) => {
      commit(Constants.SET_WAREHOUSE, w);
      dispatch(Constants.SHOW_TOASTR, {
        type: 'success',
        message: 'Successfully Created Warehouses.'
      });
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
    .then(warehouses => commit(Constants.SET_WAREHOUSE_LIST, warehouses))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Warehouses.'
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
  new WarehouseApi()
    .search(query)
    .then(warehouses => commit(Constants.SET_WAREHOUSE_LIST, warehouses.results))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching Warehouses.'
      });
      log.error(e);
    });
}

function typeahead({
  dispatch,
  commit
}, {
  query
}) {
  new WarehouseApi()
    .typeahead(query)
    .then(warehouses => commit(Constants.SET_WAREHOUSE_LIST, warehouses))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching Warehouses.'
      });
      log.error(e);
    });
}

function clearWarehouse({
  commit
}) {
  commit(Constants.CLEAR_WAREHOUSE);
}

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
    list: [],
    count: 0,
    warehouse: {},
  }
};

const ACTIONS = {
  [Constants.GET_WAREHOUSE]: getWarehouse,
  [Constants.GET_WAREHOUSES]: getWarehouses,
  [Constants.SEARCH_WAREHOUSES]: search,
  [Constants.CLEAR_WAREHOUSE]: clearWarehouse,
  [Constants.CREATE_WAREHOUSE]: createWarehouse,
  [Constants.SAVE_WAREHOUSE]: saveWarehouse,
  [Constants.SEARCH_WAREHOUSES_WITH_TYPEAHEAD]: typeahead,
  [Constants.COUNT_WAREHOUSES]: countWarehouses,
};

const MUTATIONS = {
  [Constants.SET_WAREHOUSE_LIST]: (state, results) => {
    state.warehouses.list = results;
  },
  [Constants.SET_WAREHOUSE]: (state, results) => {
    state.warehouses.warehouse = results;
  },
  [Constants.CLEAR_WAREHOUSE]: (state) => {
    state.warehouses.warehouse = {};
  },
  [Constants.SET_WAREHOUSE_COUNT]: (state, count) => {
    state.warehouses.count = count;
  },
};

const GETTERS = {
  warehouseList(state) {
    return state.warehouses.list;
  },
  warehouseCount(state) {
    return state.warehouses.count;
  },
  warehouse(state) {
    return state.warehouses.warehouse;
  },
};

const WarehouseActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default WarehouseActions;
