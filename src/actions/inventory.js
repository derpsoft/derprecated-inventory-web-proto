import log from 'loglevel';
import Constants from '../constants';
import InventoryApi from '../services/inventoryApi';

function getQuantityOnHand({
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
    .catch(e => log.error(e));
}

function receiveInventory({
  commit
}, {
  productId,
  locationId,
  quantity,
}) {
  new InventoryApi()
    .receiveInventory({
      productId,
      locationId,
      quantity,
    })
    .then(q => commit(Constants.SET_QUANTITY_ON_HAND, {
      quantity: q.quantity,
      productId,
      locationId,
    }))
    .catch(e => log.error(e));
}

function dispatchInventory({ commit, dispatch }, {
  productId,
  locationId,
  vendorId,
  quantity,
  prices
}) {
  new InventoryApi()
    .dispatchInventory({
      productId,
      locationId,
      quantity: -Math.abs(quantity),
    })
    .then((q) => {
      for (let i = 0; i < quantity; i += 1) {
        dispatch(Constants.LOG_SALE, {
          quantity: 1,
          productId,
          locationId,
          vendorId,
          inventoryTransactionId: q.id,
          total: prices[i]
        });
      }
      commit(Constants.SET_QUANTITY_ON_HAND, {
        quantity: q.quantity,
        productId,
        locationId,
      });
    })
    .catch(e => log.error(e));
}

function locateInventory({ commit }, {
  productId
}) {
  new InventoryApi()
    .locate({ productId })
    .then(() => {})
    .catch(e => log.error(e));
}

function getInventoryLogs({ commit }, { skip, take }) {
  new InventoryApi()
    .getLogs(skip, take)
    .then(response => commit(Constants.SET_INVENTORY_TRANSACTION_LOGS, response.results))
    .catch(e => log.error(e));
}

function searchInventoryLogs({ commit }, { query }) {
  new InventoryApi()
    .searchLogs(query)
    .then(response => commit(Constants.SET_INVENTORY_TRANSACTION_LOGS, response.results))
    .catch(e => log.error(e));
}

function countInventoryLogs({ commit }) {
  new InventoryApi()
    .countLogs()
    .then(count => commit(Constants.SET_INVENTORY_TRANSACTION_LOG_COUNT, count))
    .catch(e => log.error(e));
}

const INITIAL_STATE = {
  inventory: {
    quantity: {},
    logs: [],
    logCount: 0,
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
  }
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
