import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import UserActions from '../actions/user';

Vue.use(Vuex);

const state = _.merge({}, UserActions.INITIAL_STATE);
const mutations = _.merge({}, UserActions.MUTATIONS);
const getters = _.merge({}, UserActions.GETTERS);
const actions = _.merge({}, UserActions.ACTIONS);

const opts = {
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  getters,
  actions
};

console.log(opts);

const store = new Vuex.Store(opts);

export default store;
