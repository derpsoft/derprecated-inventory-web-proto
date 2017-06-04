<template>
  <main class="main">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">Home</li>
    <li class="breadcrumb-item"><a href="#">Sales</a></li>
    <li class="breadcrumb-item">Orders</li>
  </ol>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-primary" :to="{path: '/orders/add'}">Add New Order</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Orders</h3>
            <small>Find all orders</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled panel-main">
          <div class="panel-body">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <order-list></order-list>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </main>
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
