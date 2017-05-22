// @flow
import log from 'loglevel';
import {
  Inventory as InventoryApi,
  Product as ProductApi
} from 'derp-api';
import Constants from 'src/constants';

function getQuantityOnHand({
  dispatch,
  commit
} : Object, {
  productId
} : Object) : void {
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

function createTransaction({
  dispatch,
  commit
} : Object, {
  transaction,
  redirect,
  toastError = true,
} :Object) : Object {
  return new InventoryApi()
    .create(transaction)
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
} : Object, {
  transactions,
  locationId,
  redirect = null,
  toastError = true,
} : Object) : Promise<Object> {
  const withProducts: any = transactions.map(x => new ProductApi()
    .singleBySku(x.sku)
    .then((product) => {
      return {
        ...x,
        locationId,
        productId: product.id,
      };
    }));

  const receives: any = Promise.all(withProducts)
    .then(results =>
      results.map(transaction => createTransaction({
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

function locateInventory({
  dispatch,
  commit
} : Object, {
  productId
} : Object) : void {
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
} : Object, {
  skip,
  take
} : Object) : void {
  new InventoryApi()
    .getLogs(skip, take)
    .then((results) => {
      commit(Constants.SET_INVENTORY_TRANSACTION_LOGS, results);
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
} : Object, {
  query
} :Object) : void {
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
} : Object) :void {
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
} :Object) : void {
  commit(Constants.CLEAR_INVENTORY_SEARCH);
}

function setError({
  commit
} : Object, args : Object) : void {
  commit(Constants.SET_INVENTORY_ERROR, args);
}

function clearErrors({
  commit
} : Object) : void {
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
  [Constants.CREATE_INVENTORY_TRANSACTION]: createTransaction,
  [Constants.RECEIVE_INVENTORY_BULK]: bulkReceiveInventory,
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
  logs(state : Object) : Object {
    return state.inventory.logs;
  },
  logCount(state : Object) : Object {
    return state.inventory.logCount;
  },
  inventoryErrors: (state : Object) => state.inventory.errors,
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
