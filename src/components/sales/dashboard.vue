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

      <div class="row">
        <div class="col-lg-12">
          <h3>Trending</h3>
          <trending></trending>
        </div>
        <div class="col-lg-12">
          <h3>New Products</h3>
          <new-products></new-products>
        </div>
        <div class="col-lg-12">
          <h3>Reduced Price</h3>
          <on-sale></on-sale>
        </div>
        <div class="col-lg-12">
          <h3>New Inventory</h3>
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
