import _ from 'lodash';
import crud from 'actions/crud';
import Constants from 'src/constants';
import OrderApi from 'services/orderApi';

const BASE = crud('order', OrderApi);

const ORDER_BILLING_CAPTURED = 'ORDER_BILLING_CAPTURED';
const ORDER_STATUS_UPDATE = 'ORDER_STATUS_UPDATE';

Constants.add(ORDER_BILLING_CAPTURED);
Constants.add(ORDER_STATUS_UPDATE);

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
        .then(() => dispatch(Constants.GET_ORDER, order));
    },
  },
  MUTATIONS: BASE.MUTATORS,
  GETTERS: {
    ...BASE.GETTERS,
    orderByOrderNumber: state => number => _.find(state.orders.all, ['orderNumber', number]),
  },
};

export default Actions;
