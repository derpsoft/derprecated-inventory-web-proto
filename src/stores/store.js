import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import Actions from 'actions';

Vue.use(Vuex);

const state = _.merge({}, ..._.map(Actions, 'INITIAL_STATE'));
const mutations = _.merge({}, ..._.map(Actions, 'MUTATIONS'));
const getters = _.merge({}, ..._.map(Actions, 'GETTERS'));
const actions = _.merge({}, ..._.map(Actions, 'ACTIONS'));

const opts = {
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  getters,
  actions
};

const store = new Vuex.Store(opts);

export default store;
