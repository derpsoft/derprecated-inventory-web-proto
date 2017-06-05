<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Orders
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/orders/add'}"><i class="fa fa-plus"></i>Add</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <order-list></order-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
import Constants from 'src/constants';
import Search from 'components/search';
import OrderList from './list';

export default {
  name: 'orders',
  components: {
    OrderList,
    Search,
  },

  data() {
    return {
      // $FlowFixMe
      searchAction: Constants.SEARCH_ORDERS,
      // $FlowFixMe
      listAction: Constants.GET_ORDERS,
      // $FlowFixMe
      clearAction: Constants.CLEAR_ORDER_SEARCH,
    };
  },
};
</script>
