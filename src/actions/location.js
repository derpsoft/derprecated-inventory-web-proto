import log from 'loglevel';
import Constants from '../constants';
import LocationApi from '../services/locationApi';

function getLocation({
  commit
}, {
  id
}) {
  new LocationApi().single(id)
  .then(location => commit(Constants.SET_LOCATION, location))
  .catch(e => log.error(e));
}

function createLocation({
  commit
}, {
  location
}) {
  new LocationApi()
    .create(location)
    .then(w => commit(Constants.SET_LOCATION, w))
    .catch(e => log.error(e));
}

function saveLocation({
  commit
}, {
  location
}) {
  new LocationApi()
    .save(location)
    .then(w => commit(Constants.SET_LOCATION, w))
    .catch(e => log.error(e));
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
    .then(locations => commit(Constants.SET_LOCATION_LIST, locations))
    .catch(e => log.error(e));
}

function search({
  dispatch,
  commit,
}, {
  query
}) {
  new LocationApi()
    .search(query)
    .then(locations => commit(Constants.SET_LOCATION_LIST, locations.results))
    .catch(e => log.error(e));
}

function typeahead({ dispatch, commit }, { query }) {
  new LocationApi()
    .typeahead(query)
    .then(locations => commit(Constants.SET_LOCATION_LIST, locations))
    .catch(e => log.error(e));
}

function clearLocation({
  commit
}) {
  commit(Constants.CLEAR_LOCATION);
}

function countLocations({ commit }) {
  new LocationApi()
    .count()
    .then(count => commit(Constants.SET_LOCATION_COUNT, count))
    .catch(e => log.error(e));
}


const INITIAL_STATE = {
  locations: {
    list: [],
    count: 0,
    location: {},
  }
};

const ACTIONS = {
  [Constants.GET_LOCATION]: getLocation,
  [Constants.GET_LOCATIONS]: getLocations,
  [Constants.SEARCH_LOCATIONS]: search,
  [Constants.CLEAR_LOCATION]: clearLocation,
  [Constants.CREATE_LOCATION]: createLocation,
  [Constants.SAVE_LOCATION]: saveLocation,
  [Constants.SEARCH_LOCATIONS_WITH_TYPEAHEAD]: typeahead,
  [Constants.COUNT_LOCATIONS]: countLocations,
};

const MUTATIONS = {
  [Constants.SET_LOCATION_LIST]: (state, results) => {
    state.locations.list = results;
  },
  [Constants.SET_LOCATION]: (state, results) => {
    state.locations.location = results;
  },
  [Constants.CLEAR_LOCATION]: (state) => {
    state.locations.location = {};
  },
  [Constants.SET_LOCATION_COUNT]: (state, count) => {
    state.locations.count = count;
  },
};

const GETTERS = {
  locationList(state) {
    return state.locations.list;
  },
  locationCount(state) {
    return state.locations.count;
  },
  location(state) {
    return state.locations.location;
  },
};

const LocationActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default LocationActions;
