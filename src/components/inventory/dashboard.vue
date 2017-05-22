<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-global"></i>
          </div>
          <div class="header-title">
            <div class="pull-right">
              <today></today>
            </div>
            <h3 class="m-b-xs">Inventory Dashboard</h3>
            <small>Pass it on</small>
          </div>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <shipped></shipped>
        </div>
        <div class="col-lg-6 col-sm-12">
          <received></received>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <h3>Recent</h3>
          <churn></churn>
        </div>
        <div class="col-lg-12">
          <h3>Needs Shipping</h3>
          <needs-shipping></needs-shipping>
        </div>
      </div>
    </div>
  </div>
</section>
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
