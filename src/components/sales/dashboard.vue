<style lang="css">
</style>

<template>
<div class="animated fadeIn">
  <div class="row">
    <div class="col-lg-4 col-12">
      <listings></listings>
    </div>
    <div class="col-lg-4 col-12">
      <revenue></revenue>
    </div>
    <div class="col-lg-4 col-12">
      <sales></sales>
    </div>
  </div>
  <div class="card">
    <div class="card-block">
      <div class="row">
        <div class="col-12">
          <h3 class="card-title">
            Trending
          </h3>
        </div>
      </div>
      <trending></trending>
    </div>
  </div>
  <div class="card">
    <div class="card-block">
      <div class="row">
        <div class="col-12">
          <h3 class="card-title">
            New Products
          </h3>
        </div>
      </div>
      <new-products></new-products>
    </div>
  </div>
  <div class="card">
    <div class="card-block">
      <div class="row">
        <div class="col-12">
          <h3 class="card-title">
            Reduced Price
          </h3>
        </div>
      </div>
      <on-sale></on-sale>
    </div>
  </div>
  <div class="card">
    <div class="card-block">
      <div class="row">
        <div class="col-12">
          <h3 class="card-title">
            New Inventory
          </h3>
        </div>
      </div>
      <new-inventory></new-inventory>
    </div>
  </div>
</div>
</template>

<script>
  import Today from 'shared/today';
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
