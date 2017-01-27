<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/inventory/receive'}">Receive</router-link>
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/inventory/dispatch'}">Dispatch</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-box2"></i>
          </div>
          <div class="header-title">
            <h3>Inventory</h3>
            <small>Manage Inventory</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <search :searchActionName="searchAction" :listActionName="listAction"></search>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <inventory-log></inventory-log>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import InventoryLog from './log.vue';
import Search from '../search.vue';
import Constants from '../../constants';

export default {
  data() {
    return {
      searchAction: Constants.SEARCH_INVENTORY_TRANSACTION_LOGS,
      listAction: Constants.GET_INVENTORY_TRANSACTION_LOGS,
    };
  },

  components: {
    InventoryLog,
    Search,
  },
};
</script>
