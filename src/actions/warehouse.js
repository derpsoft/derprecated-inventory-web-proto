import log from 'loglevel';
import Constants from '../constants';
import WarehouseApi from '../services/warehouseApi';

function getWarehouse({
  commit
}, {
  id
}) {
  new WarehouseApi().retrieve(id)
  .then(warehouse => commit(Constants.SET_WAREHOUSE, warehouse))
  .catch(e => log.error(e));
}

function createWarehouse({
  commit
}, {
  warehouse
}) {
  new WarehouseApi()
    .create(warehouse)
    .then(res => commit(Constants.SET_WAREHOUSE, res.warehouse))
    .catch(e => log.error(e));
}

function saveWarehouse({
  commit
}, {
  warehouse
}) {
  new WarehouseApi()
    .save(warehouse)
    .then(res => commit(Constants.SET_WAREHOUSE, res.warehouse))
    .catch(e => log.error(e));
}

function getWarehouses({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new WarehouseApi().list(skip, take)
  .then(warehouses => commit(Constants.SET_WAREHOUSE_LIST, warehouses))
  .catch(e => log.error(e));
}

function search({
  dispatch,
  commit,
}, {
  query
}) {
  new WarehouseApi().search(query)
  .then(warehouses => commit(Constants.SET_WAREHOUSE_LIST, warehouses.results))
  .catch(e => log.error(e));
}

function typeahead({ dispatch, commit }, { query }) {
  new WarehouseApi()
    .typeahead(query)
    .then(warehouses => commit(Constants.SET_WAREHOUSE_LIST, warehouses.results))
    .catch(e => log.error(e));
}

function clearWarehouse({
  commit
}) {
  commit(Constants.CLEAR_WAREHOUSE);
}


const INITIAL_STATE = {
  warehouses: {
    search: {
      query: {},
      results: {}
    },
    list: {
      count: 0
    },
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
};

const MUTATIONS = {
  [Constants.SET_WAREHOUSE_SEARCH_QUERY]: (state, query) => {
    state.warehouses.search.query = query;
  },
  [Constants.SET_WAREHOUSE_SEARCH_RESULTS]: (state, results) => {
    state.warehouses.search.results = results;
  },
  [Constants.CLEAR_WAREHOUSE_SEARCH]: (state) => {
    state.warehouses.search = {
      query: {},
      results: {},
    };
  },
  [Constants.SET_WAREHOUSE_LIST]: (state, results) => {
    state.warehouses.list = results;
  },
  [Constants.SET_WAREHOUSE]: (state, results) => {
    state.warehouses.warehouse = results;
  },
  [Constants.CLEAR_WAREHOUSE]: (state) => {
    state.warehouses.warehouse = {};
  },
};

const GETTERS = {
  warehouseList(state) {
    return state.warehouses.list;
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
