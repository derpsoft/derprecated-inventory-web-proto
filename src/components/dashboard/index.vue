<style lang="css">
</style>

<template>
      <div class="animated fadeIn">
        <div class="row">
          <div class="col-12">
            <today></today>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <inventory-dispatched></inventory-dispatched>
          </div>
          <div class="col-4">
            <inventory-received></inventory-received>
          </div>

          <div class="col-4">
            <total-sales></total-sales>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Traffic
            <ul class="nav nav-tabs float-right" role="tablist">
              <li class="nav-item">
                <a tab="" class="nav-link" data-toggle="tab" href="#" role="tab">24h</a>
              </li>
              <li class="nav-item">
                <a tab="" class="nav-link active" data-toggle="tab" href="#" role="tab">Days</a>
              </li>
              <li class="nav-item">
                <a tab="" class="nav-link" data-toggle="tab" href="#" role="tab">Weeks</a>
              </li>
            </ul>
          </div>
          <div class="card-block">
            <div class="chart-wrapper" style="height:250px;margin-top:20px;">
              <div class="chart-wrapper" style="height:250px;margin-top:20px;">
                <canvas id="main-chart" height="250"></canvas>
              </div>
            </div>
          </div>
          <div class="card-footer p-0">
            <ul>
              <li class="b-r-1 py-2">
                <strong>17.781</strong>
                <br>Pageviews</li>
              <li class="b-r-1 py-2">
                <strong>9.879</strong>
                <br>Unique Users</li>
              <li class="b-r-1 py-2">
                <strong>00:02:58</strong>
                <br>Avg. Visit Duration</li>
              <li class="py-2">
                <strong>59,83%</strong>
                <br>Bounce Rate</li>
            </ul>
          </div>
        </div>
      </div>
</template>

<script>
// @flow
  import Constants from 'src/constants';
  import Today from 'shared/today';
  import TotalSales from './totalSales';
  import InventoryReceived from './inventoryReceived';
  import InventoryDispatched from './inventoryDispatched';
  import SummaryChart from './summary-chart';

  export default {
    name: 'dashboard',
    data() {
      return {
        groupBy: 'month',
      };
    },
    components: {
      Today,
      TotalSales,
      InventoryReceived,
      InventoryDispatched,
      SummaryChart,
    },
    mounted() {
      this.$store.dispatch(Constants.GET_DASHBOARD, {
        groupBy: this.groupBy
      });
    },
  };
</script>
