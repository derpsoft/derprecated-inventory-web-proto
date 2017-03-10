import log from 'loglevel';
import Constants from 'src/constants';
import InventoryApi from 'services/inventoryApi';
import ProductApi from 'services/productApi';

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
  toastError = true,
}) {
  return new InventoryApi()
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
      if (toastError) {
        dispatch(Constants.SHOW_TOASTR, {
          type: 'error',
          message: 'Error has occured while attempting to receiving inventory.'
        });
      }
      commit(Constants.SET_INVENTORY_ERROR, {
        e,
        transaction
      });
      log.error(e);
    });
}

function bulkReceiveInventory({
  dispatch,
  commit,
}, {
  transactions,
  locationId,
  redirect = null,
  toastError = true,
}) {
  const withProducts = transactions.map(x => new ProductApi()
    .singleBySku(x.sku)
    .then((product) => {
      return {
        ...x,
        locationId,
        productId: product.id,
      };
    }));

  const receives = Promise.all(withProducts)
    .then(results =>
      results.map(transaction => receiveInventory({
        commit,
        dispatch
      }, {
        transaction,
        toastError: false,
      }))
    );

  return Promise.all(receives)
    .then(() => {
      if (redirect) {
        redirect();
      }
    })
    .catch((e) => {
      if (toastError) {
        dispatch(Constants.SHOW_TOASTR, {
          type: 'error',
          message: 'Error has occured while attempting to import inventory.'
        });
      }
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

function setError({
  commit
}, args) {
  commit(Constants.SET_INVENTORY_ERROR, args);
}

function clearErrors({
  commit
}) {
  commit(Constants.CLEAR_INVENTORY_ERRORS);
}

const INITIAL_STATE = {
  inventory: {
    quantity: {},
    logs: [],
    errors: {},
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
  [Constants.RECEIVE_INVENTORY_BULK]: bulkReceiveInventory,
  [Constants.DISPATCH_INVENTORY]: dispatchInventory,
  [Constants.LOCATE_INVENTORY]: locateInventory,
  [Constants.GET_INVENTORY_TRANSACTION_LOGS]: getInventoryLogs,
  [Constants.SEARCH_INVENTORY_TRANSACTION_LOGS]: searchInventoryLogs,
  [Constants.COUNT_INVENTORY_LOGS]: countInventoryLogs,
  [Constants.CLEAR_INVENTORY_SEARCH]: clearSearch,
  [Constants.CLEAR_INVENTORY_ERRORS]: clearErrors,
  [Constants.SET_INVENTORY_ERROR]: setError,
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

  [Constants.SET_INVENTORY_ERROR]: (state, {
    e,
    transaction
  }) => {
    state.inventory.errors[transaction.id] = e;
  },

  [Constants.CLEAR_INVENTORY_ERRORS]: (state) => {
    state.inventory.errors = {};
  },
};

const GETTERS = {
  logs(state) {
    return state.inventory.logs;
  },
  logCount(state) {
    return state.inventory.logCount;
  },
  inventoryErrors: state => state.inventory.errors,
  shipped: () => Math.random(30),
  received: () => Math.random(30),
};

const InventoryActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS,
};

export default InventoryActions;
