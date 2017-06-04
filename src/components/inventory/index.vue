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
            <router-link class="btn btn-primary" :to="{path: '/inventory/import'}">Import</router-link>
            <router-link class="btn btn-info" :to="{path: '/inventory/receive'}">Receive</router-link>
            <router-link class="btn btn-warning" :to="{path: '/inventory/dispatch'}">Dispatch</router-link>
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
        <div class="panel panel-filled panel-main">
          <div class="panel-body">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <inventory-log></inventory-log>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
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
