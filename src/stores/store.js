import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import _ from 'lodash';
import {* as UserActions} from '../actions/user';

const state = _.merge({}, UserActions.INITIAL_STATE);
const mutations = _.merge({}, UserActions.MUTATIONS);

/* eslint-disable no-param-reassign */
const store = new Vuex.Store({
  // {
  //   user: {
  //     isAuthenticated: false,
  //     userName: null,
  //     sessionId: null,
  //     userId: null,
  //   },
  // },
  state, mutations
});

export default store;
