<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Warehouses
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/warehouses/add'}"><i class="fa fa-plus"></i>Add New Warehouse</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <warehouse-list></warehouse-list>
          </div>
        </div>
      </div>
    </div>
  </div>
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
