import log from 'loglevel';
import _ from 'lodash';
import Vue from 'vue';
import Constants from '../constants';
import LocationApi from '../services/locationApi';

function getLocation({
  dispatch,
  commit
}, {
  id
}) {
  new LocationApi().single(id)
    .then(location => commit(Constants.SET_LOCATION, location))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Retrieving Location.'
      });
      log.error(e);
    });
}

function createLocation({
  dispatch,
  commit
}, {
  location,
  redirect,
}) {
  new LocationApi()
    .create(location)
    .then((w) => {
      commit(Constants.SET_LOCATION, w);

      if (typeof redirect === 'function') {
        redirect.apply();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Creating Location.'
      });
      log.error(e);
    });
}

function saveLocation({
  dispatch,
  commit
}, {
  location
}) {
  new LocationApi()
    .save(location)
    .then((w) => {
      commit(Constants.SET_LOCATION, w);
      dispatch(Constants.SHOW_TOASTR, {
        type: 'success',
        message: 'Successfully Saved Location.'
      });
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Saving Location.'
      });
      log.error(e);
    });
}

function getLocations({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new LocationApi()
    .list(skip, take)
    .then(locations => commit(Constants.SET_LOCATIONS, locations))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Retrieving Locations.'
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
  new LocationApi()
    .typeahead(query)
    .then(locations => commit(Constants.SET_LOCATION_SEARCH_RESULTS, locations))
    .catch(e => log.error(e));
}

function countLocations({
  dispatch,
  commit
}) {
  new LocationApi()
    .count()
    .then(count => commit(Constants.SET_LOCATION_COUNT, count))
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Setting Location Count.'
      });
      log.error(e);
    });
}

function deleteLocation({ dispatch }, id) {
  if (id < 1) {
    throw new Error('id must be >= 1');
  }
  new LocationApi()
    .delete(id)
    .then(() => dispatch(Constants.SHOW_TOASTR, {
      type: 'info',
      message: 'Location deleted'
    }))
    .catch(e => log.error(e));
}


const INITIAL_STATE = {
  locations: {
    all: {},
    count: 0,
    search: {
      results: [],
    },
  }
};

const ACTIONS = {
  [Constants.GET_LOCATION]: getLocation,
  [Constants.GET_LOCATIONS]: getLocations,
  [Constants.CREATE_LOCATION]: createLocation,
  [Constants.SAVE_LOCATION]: saveLocation,
  [Constants.SEARCH_LOCATIONS_WITH_TYPEAHEAD]: typeahead,
  [Constants.COUNT_LOCATIONS]: countLocations,
  [Constants.DELETE_LOCATION]: deleteLocation,
};

const MUTATIONS = {
  [Constants.SET_LOCATIONS]: (state, results) => {
    state.locations.all = _.merge({},
      state.locations.all,
      _.keyBy(results, x => x.id)
    );
  },
  [Constants.SET_LOCATION]: (state, result) => {
    if (state.locations.all[result.id]) {
      state.locations.all[result.id] = _.merge({}, state.locations.all[result.id], result);
    } else {
      Vue.set(state.locations.all, result.id, result);
    }
  },
  [Constants.SET_LOCATION_COUNT]: (state, count) => {
    state.locations.count = count;
  },
  [Constants.SET_LOCATION_SEARCH_RESULTS]: (state, results) => {
    state.locations.search.results = results;
  },
};

const GETTERS = {
  location: state => id => state.locations.all[id],
  locations: state => _.values(state.locations.all),
  locationCount: state => state.locations.count,
  locationSearch: state => state.locations.search.results,
};

const LocationActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default LocationActions;
