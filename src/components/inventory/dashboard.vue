<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <shipped></shipped>
      </div>
      <div class="col-lg-6 col-sm-12">
        <received></received>
      </div>
    </div>
    <div class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-12">
            <h3 class="card-title">
              Recent
            </h3>
          </div>
        </div>
        <churn></churn>
      </div>
    </div>
    <div class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-12">
            <h3 class="card-title">
              Needs Shipping
            </h3>
          </div>
        </div>
        <needs-shipping></needs-shipping>
      </div>
    </div>
  </div>
</template>

<script>
  // @flow
  import Today from 'shared/today';
  import Shipped from './metrics/shipped';
  import Received from './metrics/received';
  import Churn from './tables/churn';
  import NeedsShipping from './tables/shipping';

  export default {
    name: 'inventory-dashboard',

    components: {
      Today,
      Shipped,
      Received,
      Churn,
      NeedsShipping,
    },
  };
</script>
