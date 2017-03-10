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
        <h2>My Stats</h2>
        <div class="col-lg-2 col-sm-12">
          <listings></listings>
        </div>
        <div class="col-lg-2 col-sm-12">
          <revenue></revenue>
        </div>
        <div class="col-lg-2 col-sm-12">
          <sales></sales>
        </div>
        <div class="col-lg-6 col-sm-12">

        </div>
      </div>

      <div class="row">
        <h2>Sell</h2>
        <div class="col-lg-3">
          <h3>New Inventory</h3>
          <new-inventory></new-inventory>
        </div>
        <div class="col-lg-3">
          <h3>New Products</h3>
          <new-products></new-products>
        </div>
        <div class="col-lg-3">
          <h3>Priced to Sell</h3>
          <on-sale></on-sale>
        </div>
        <div class="col-lg-3">
          <h3>Trending</h3>
          <trending></trending>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script>
import Today from 'shared/today';
import Chart from './charts/chart';
import Sales from './metrics/sales';
import Revenue from './metrics/revenue';
import Listings from './metrics/listings';
import Trending from './tables/trending';
import OnSale from './tables/onSale';
import NewInventory from './tables/newInventory';
import NewProducts from './tables/newProducts';

export default {
  name: 'sales-dashboard',

  components: {
    Chart,
    Today,
    Sales,
    Revenue,
    Listings,
    Trending,
    OnSale,
    NewInventory,
    NewProducts,
  },

  computed: {
    groupBy() {
      return 'Month';
    },
  },
};

</script>
