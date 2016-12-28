import log from 'loglevel';
import Constants from '../constants';
import VendorApi from '../services/vendorApi';

function getVendor({
  commit
}, {
  id
}) {
  new VendorApi()
    .retrieve(id)
    .then(vendor => commit(Constants.SET_VENDOR, vendor))
    .catch(e => log.error(e));
}

function createVendor({
  commit
}, {
  vendor
}) {
  new VendorApi()
    .create(vendor)
    .then(res => commit(Constants.SET_VENDOR, res.vendor))
    .catch(e => log.error(e));
}

function countVendors({ commit }) {
  new VendorApi()
    .count()
    .then(res => commit(Constants.SET_VENDOR_COUNT, res.count))
    .catch(e => log.error(e));
}

function saveVendor({
  commit
}, {
  vendor
}) {
  new VendorApi()
    .save(vendor)
    .then(res => commit(Constants.SET_VENDOR, res.vendor))
    .catch(e => log.error(e));
}

function getVendors({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new VendorApi()
    .list(skip, take)
    .then(response => commit(Constants.SET_VENDOR_LIST, response))
    .catch(e => log.error(e));
}

function search({
  dispatch,
  commit,
}, {
  query
}) {
  new VendorApi()
    .search(query)
    .then(response => commit(Constants.SET_VENDOR_LIST, response.results))
    .catch(e => log.error(e));
}

function typeahead({
  dispatch,
  commit,
}, {
  query
}) {
  new VendorApi()
    .typeahead(query)
    .then(vendors => commit(Constants.SET_VENDOR_LIST, vendors))
    .catch(e => log.error(e));
}

function clearVendor({
  commit
}) {
  commit(Constants.CLEAR_VENDOR);
}


const INITIAL_STATE = {
  vendors: {
    list: [],
    vendor: {},
    count: 0,
  }
};

const ACTIONS = {
  [Constants.GET_VENDOR]: getVendor,
  [Constants.GET_VENDORS]: getVendors,
  [Constants.SEARCH_VENDORS]: search,
  [Constants.CLEAR_VENDOR]: clearVendor,
  [Constants.CREATE_VENDOR]: createVendor,
  [Constants.SAVE_VENDOR]: saveVendor,
  [Constants.COUNT_VENDORS]: countVendors,
  [Constants.SEARCH_VENDORS_WITH_TYPEAHEAD]: typeahead,
};

const MUTATIONS = {
  [Constants.SET_VENDOR_LIST]: (state, list) => {
    state.vendors.list = list;
  },
  [Constants.SET_VENDOR]: (state, results) => {
    state.vendors.vendor = results;
  },
  [Constants.SET_VENDOR_COUNT]: (state, count) => {
    state.vendors.count = count;
  },
  [Constants.CLEAR_VENDOR]: (state) => {
    state.vendors.vendor = {};
  },
};

const GETTERS = {
  vendors(state) {
    return state.vendors.list;
  },
  vendorCount(state) {
    return state.vendors.count;
  },
  vendor(state) {
    return state.vendors.vendor;
  },
};

const VendorActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default VendorActions;
