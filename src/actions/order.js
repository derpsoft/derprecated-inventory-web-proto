import crud from 'actions/crud';
import Constants from 'src/constants';
import OrderApi from 'services/orderApi';

const BASE = crud('order', OrderApi);

const ORDER_BILLING_CAPTURED = 'ORDER_BILLING_CAPTURED';

Constants.add(ORDER_BILLING_CAPTURED);

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
        .then(() => dispatch(Constants.GET_ORDER, {
          id: order.id
        }));
    },
  },
  MUTATIONS: BASE.MUTATORS,
  GETTERS: BASE.GETTERS,
};

export default Actions;
