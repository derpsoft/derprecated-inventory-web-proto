import log from 'loglevel';
import _ from 'lodash';
import Vue from 'vue';
import Constants from '../constants';
import VendorApi from '../services/vendorApi';

function getVendor({
  dispatch,
  commit
}, {
  id
}) {
  new VendorApi()
    .single(id)
    .then(vendor => commit(Constants.SET_VENDOR, vendor))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Vendor.'
      });
      log.error(e);
    });
}

function createVendor({
  dispatch,
  commit
}, {
  vendor,
  redirect,
}) {
  new VendorApi()
    .create(vendor)
    .then((v) => {
      commit(Constants.SET_VENDOR, v);

      if (typeof redirect === 'function') {
        redirect();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Creating Vendor.'
      });
      log.error(e);
    });
}

function countVendors({
  dispatch,
  commit
}) {
  new VendorApi()
    .count()
    .then(count => commit(Constants.SET_VENDOR_COUNT, count))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Setting Vendor Counts.'
      });
      log.error(e);
    });
}

function saveVendor({
  dispatch,
  commit
}, {
  vendor
}) {
  new VendorApi()
    .save(vendor)
    .then((v) => {
      commit(Constants.SET_VENDOR, v);

      dispatch(Constants.SHOW_TOASTR, {
        type: 'success',
        message: 'Successfully Saved Vendor.'
      });
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Saving Vendor.'
      });
      log.error(e);
    });
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
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Getting Vendors.'
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
  new VendorApi()
    .search(query)
    .then(response => commit(Constants.SET_VENDOR_LIST, response.results))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching for Vendors.'
      });
      log.error(e);
    });
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
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Searching for Vendors.'
      });
      log.error(e);
    });
}

function clearVendor({
  commit
}) {
  commit(Constants.CLEAR_VENDOR);
}


const INITIAL_STATE = {
  vendors: {
    all: {},
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
  [Constants.SET_VENDOR_LIST]: (state, results) => {
    state.vendors.all = _.merge({},
      state.vendors.all,
      _.keyBy(results, x => x.id)
    );
  },
  [Constants.SET_VENDOR]: (state, result) => {
    if (state.vendors.all[result.id]) {
      state.vendors.all[result.id] = _.merge({}, state.vendors.all[result.id], result);
    } else {
      Vue.set(state.vendors.all, result.id, result);
    }
  },
  [Constants.SET_VENDOR_COUNT]: (state, count) => {
    state.vendors.count = count;
  },
  [Constants.CLEAR_VENDOR]: (state, id) => {
    delete state.vendors.all[id];
  },
};

const GETTERS = {
  vendors: state => _.values(state.vendors.all),
  vendor: state => id => state.vendors.all[id],
  vendorCount: state => state.vendors.count,
};

const VendorActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default VendorActions;
