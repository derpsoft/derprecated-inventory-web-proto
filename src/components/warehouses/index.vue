<template>
  <main class="main">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">Home</li>
    <li class="breadcrumb-item"><a href="#">Inventory</a>
    </li>
  </ol>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-primary" :to="{path: '/warehouses/add'}">Add New Warehouse</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-home"></i>
          </div>
          <div class="header-title">
            <h3>Warehouses</h3>
            <small>Find all warehouses</small>
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
            <warehouse-list></warehouse-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import Constants from 'src/constants';
import Search from 'components/search';
import WarehouseList from './list';

export default {
  name: 'warehouse',
  components: {
    WarehouseList,
    Search,
  },

  data() {
    return {
      searchAction: Constants.SEARCH_WAREHOUSES,
      listAction: Constants.GET_WAREHOUSES,
      clearAction: Constants.CLEAR_WAREHOUSE_SEARCH,
    };
  },
};
</script>
