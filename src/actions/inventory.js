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
  quantity
}) {
  new InventoryApi()
    .receiveInventory({
      productId,
      quantity
    })
    .then(q => commit(Constants.SET_QUANTITY_ON_HAND, {
      quantity: q.quantity,
      productId
    }))
    .catch(e => log.error(e));
}

function dispatchInventory({ commit }, {
  productId,
  quantity
}) {
  new InventoryApi()
    .dispatchInventory({
      productId,
      quantity
    })
    .then(() => {})
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

const INITIAL_STATE = {
  inventory: {
    quantity: {},
    logs: [],
  }
};

const ACTIONS = {
  [Constants.GET_QUANTITY_ON_HAND]: getQuantityOnHand,
  [Constants.RECEIVE_INVENTORY]: receiveInventory,
  [Constants.DISPATCH_INVENTORY]: dispatchInventory,
  [Constants.LOCATE_INVENTORY]: locateInventory,
  [Constants.GET_INVENTORY_TRANSACTION_LOGS]: getInventoryLogs,
  [Constants.SEARCH_INVENTORY_TRANSACTION_LOGS]: searchInventoryLogs,
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
  }
};

const GETTERS = {
  logs(state) {
    return state.inventory.logs;
  }
};

const InventoryActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS,
};

export default InventoryActions;
