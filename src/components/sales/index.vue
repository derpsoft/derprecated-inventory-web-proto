<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/sales/add'}">Add New Sale</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Sales</h3>
            <small>Find all sales</small>
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
            <sale-list></sale-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Constants from 'src/constants';
  import Search from 'components/search';
  import SaleList from './list';

  export default {
    name: 'sales',
    data() {
      return {
        searchAction: Constants.SEARCH_SALES,
        listAction: Constants.GET_SALES,
        clearAction: Constants.CLEAR_SALE_SEARCH,
      };
    },

    components: {
      SaleList,
      Search,
    },
  };
</script>
