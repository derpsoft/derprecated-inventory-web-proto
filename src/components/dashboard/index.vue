<style lang="css">
</style>

<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-shield"></i>
          </div>
          <div class="header-title">
            <div class="pull-right">
              <today></today>
            </div>
            <h3 class="m-b-xs">Derprecated Dashboard Concept</h3>
            <small>Derp overview</small>
          </div>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-12">
          <inventory-dispatched></inventory-dispatched>
        </div>
        <div class="col-lg-4 col-sm-12">
          <inventory-received></inventory-received>
        </div>
        <div class="col-lg-4 col-sm-12">
          <!--<total-sales></total-sales>-->
        </div>
      </div>
      <div class="row" v-is-dev>
        <div class="col-md-12">
          <div class="panel panel-filled">
            <div class="panel-body">
              <!-- <chart></chart> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
// @flow
import Constants from 'src/constants';
import Today from 'shared/today';
// import Chart from './chart';
import TotalSales from './totalSales';
import InventoryReceived from './inventoryReceived';
import InventoryDispatched from './inventoryDispatched';

export default {
  name: 'dashboard',
  data() {
    return {
      groupBy: 'month',
    };
  },
  components: {
  //  Chart,
    Today,
    TotalSales,
    InventoryReceived,
    InventoryDispatched
  },
  mounted() {
    this.$store.dispatch(Constants.GET_DASHBOARD, {
      groupBy: this.groupBy
    });
  },
};
</script>
