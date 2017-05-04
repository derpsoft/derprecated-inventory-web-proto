// @flow

import {
  Order
} from 'derp-api';

export default class Api extends Order {
  listByShippingUser(userId: number, skip: number = 0,
    take: number = 25, includeDeleted: bool = false) {
    const body = new URLSearchParams();
    body.set('skip', skip.toString());
    body.set('take', take.toString());
    body.set('includeDeleted', includeDeleted.toString());

    const route = `/api/v1/orders/${userId.toString()}?${body.toString()}`;
    return this.get(route);
  }
}
