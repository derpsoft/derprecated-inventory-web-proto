<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Inventory
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/inventory/import'}"><i class="fa fa-plus"></i>Import</router-link>
              <router-link class="btn" :to="{path: '/inventory/receive'}"><i class="fa fa-ship"></i>Receive</router-link>
              <router-link class="btn" :to="{path: '/inventory/dispatch'}"><i class="fa fa-truck"></i>Dispatch</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <inventory-log></inventory-log>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
import Search from 'components/search';
import Constants from 'src/constants';
import InventoryLog from './list';

export default {
  name: 'inventory',

  data() {
    return {
      searchAction: Constants.SEARCH_INVENTORY_TRANSACTION_LOGS,
      listAction: Constants.GET_INVENTORY_TRANSACTION_LOGS,
      clearAction: Constants.CLEAR_INVENTORY_SEARCH,
    };
  },

  components: {
    InventoryLog,
    Search,
  },
};
</script>
