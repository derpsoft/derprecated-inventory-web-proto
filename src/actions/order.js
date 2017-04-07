// @flow

import _ from 'lodash';
import Vue from 'vue';
import crud from 'actions/crud';
import Constants from 'src/constants';
import {
  Order as OrderApi
} from 'derp-api';

const BASE = crud('order', OrderApi);

const ORDER_BILLING_CAPTURED = 'ORDER_BILLING_CAPTURED';
const ORDER_STATUS_UPDATE = 'ORDER_STATUS_UPDATE';
const GET_ORDER_BY_KEY = 'GET_ORDER_BY_KEY';

Constants.add(ORDER_BILLING_CAPTURED);
Constants.add(ORDER_STATUS_UPDATE);
Constants.add(GET_ORDER_BY_KEY);

const t = Constants.fluxTemplates;

const Actions = {
  INITIAL_STATE: {
    orders: BASE.INITIAL_STATE,
  },
  ACTIONS: {
    ...BASE.ACTIONS,
    [ORDER_BILLING_CAPTURED]: ({
      dispatch
    }, {
      order,
      token
    }) => {
      const api = new OrderApi();
      return api.captureBilling(order, token)
        // $FlowFixMe
        .then(() => dispatch(Constants.GET_ORDER, order));
    },
    [ORDER_STATUS_UPDATE]: ({
      dispatch
    }, {
      order,
      status
    }) => {
      const api = new OrderApi();
      return api.updateStatus(order, status)
        // $FlowFixMe
        .then(() => dispatch(Constants.GET_ORDER, order));
    },
    [GET_ORDER_BY_KEY]: ({
      commit
    }, args) => {
      const api = new OrderApi();
      return api.getByKey(args)
        // $FlowFixMe
        .then(order => commit(Constants.SET_ORDER, order));
    },
  },
  MUTATIONS: {
    ...BASE.MUTATORS,
    [t.SET_ONE('order')]: (state, x) => {
      const id = x.id || x.orderNumber;
      if (state.orders.all[id]) {
        state.orders.all[id] = _.merge({}, state.orders.all[id], x);
      } else {
        Vue.set(state.orders.all, id, x);
      }
    },
  },
  GETTERS: BASE.GETTERS,
};

export default Actions;
