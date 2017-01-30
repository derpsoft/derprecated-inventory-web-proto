<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/warehouses/add'}">Add New Warehouse</router-link>
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
            <search :searchActionName="searchAction" :listActionName="listAction"></search>
            <warehouse-list></warehouse-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import WarehouseList from './list.vue';
import Search from '../search.vue';
import Constants from '../../constants';

export default {
  components: {
    WarehouseList,
    Search,
  },

  data() {
    return {
      searchAction: Constants.SEARCH_WAREHOUSES_WITH_TYPEAHEAD,
      listAction: Constants.GET_WAREHOUSES,
    };
  },
};
</script>
