import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
const store = new Vuex.Store({
  state: {
    user: {
      isAuthenticated: false,
      userName: null,
      sessionId: null,
      userId: null,
    },
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
});

export default store;
