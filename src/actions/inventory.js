import log from 'loglevel';
import Constants from 'src/constants';
import InventoryApi from 'services/inventoryApi';

function getQuantityOnHand({
  dispatch,
  commit
}, {
  productId
}) {
  new InventoryApi()
    .getQuantityOnHand(productId)
    .then(q => commit(Constants.SET_QUANTITY_ON_HAND, {
      quantity: q.quantity,
      productId
    }))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Quantity on Hand.'
      });
      log.error(e);
    });
}

function receiveInventory({
  dispatch,
  commit
}, {
  transaction,
  redirect,
}) {
  new InventoryApi()
    .receiveInventory(transaction)
    .then((q) => {
      commit(Constants.SET_QUANTITY_ON_HAND, {
        ...transaction,
        quantity: q.quantity,
      });
      if (typeof redirect === 'function') {
        redirect();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error has occured while attempting to receiving inventory.'
      });
      log.error(e);
    });
}

function dispatchInventory({
  dispatch,
  commit
}, {
  transaction,
  redirect,
}) {
  new InventoryApi()
    .dispatchInventory({
      ...transaction,
      quantity: -Math.abs(transaction.quantity),
    })
    .then((q) => {
      commit(Constants.SET_QUANTITY_ON_HAND, {
        ...transaction,
        quantity: q.quantity,
      });

      return q;
    })
    .then((q) => {
      commit(Constants.SET_QUANTITY_ON_HAND, {
        ...transaction,
        quantity: q.quantity,
      });

      if (typeof redirect === 'function') {
        redirect();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error has occured while attempting to dispatch inventory.'
      });
      log.error(e);
    });
}

function locateInventory({
  dispatch,
  commit
}, {
  productId
}) {
  new InventoryApi()
    .locate({
      productId
    })
    .then(() => {})
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error locating inventory.'
      });
      log.error(e);
    });
}

function getInventoryLogs({
  dispatch,
  commit
}, {
  skip,
  take
}) {
  new InventoryApi()
    .getLogs(skip, take)
    .then((response) => {
      commit(Constants.SET_INVENTORY_TRANSACTION_LOGS, response.results);
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error retrieving inventory logs.'
      });
      log.error(e);
    });
}

function searchInventoryLogs({
  dispatch,
  commit
}, {
  query
}) {
  new InventoryApi()
    .searchLogs(query)
    .then(response => commit(Constants.SET_INVENTORY_TRANSACTION_LOGS, response.results))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error searching for inventory logs.'
      });
      log.error(e);
    });
}

function countInventoryLogs({
  dispatch,
  commit
}) {
  new InventoryApi()
    .countLogs()
    .then(count => commit(Constants.SET_INVENTORY_TRANSACTION_LOG_COUNT, count))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error setting for inventory log count.'
      });
      log.error(e);
    });
}

function clearSearch({
  commit
}) {
  commit(Constants.CLEAR_INVENTORY_SEARCH);
}

const INITIAL_STATE = {
  inventory: {
    quantity: {},
    logs: [],
    logCount: 0,
    search: {
      results: [],
      query: {},
    },
  }
};

const ACTIONS = {
  [Constants.GET_QUANTITY_ON_HAND]: getQuantityOnHand,
  [Constants.RECEIVE_INVENTORY]: receiveInventory,
  [Constants.DISPATCH_INVENTORY]: dispatchInventory,
  [Constants.LOCATE_INVENTORY]: locateInventory,
  [Constants.GET_INVENTORY_TRANSACTION_LOGS]: getInventoryLogs,
  [Constants.SEARCH_INVENTORY_TRANSACTION_LOGS]: searchInventoryLogs,
  [Constants.COUNT_INVENTORY_LOGS]: countInventoryLogs,
  [Constants.CLEAR_INVENTORY_SEARCH]: clearSearch,
};

const MUTATIONS = {
  [Constants.SET_QUANTITY_ON_HAND]: (state, {
    productId,
    quantity
  }) => {
    state.inventory.quantity[productId] = quantity;
  },

  [Constants.SET_INVENTORY_TRANSACTION_LOGS]: (state, logs) => {
    state.inventory.logs = logs;
  },

  [Constants.SET_INVENTORY_TRANSACTION_LOG_COUNT]: (state, count) => {
    state.inventory.logCount = count;
  },

  [Constants.CLEAR_INVENTORY_SEARCH]: (state) => {
    state.inventory.search.results = {};
    state.inventory.search.query = {};
  },
};

const GETTERS = {
  logs(state) {
    return state.inventory.logs;
  },
  logCount(state) {
    return state.inventory.logCount;
  },
};

const InventoryActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS,
};

export default InventoryActions;
