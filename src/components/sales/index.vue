<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/sales/add'}">Add New Sale</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Sales</h3>
            <small>Find all sales</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <sale-search></sale-search>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <sale-list></sale-list>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import SaleList from './list.vue';
import SaleSearch from './search.vue';

export default {
  components: {
    SaleList,
    SaleSearch,
  },
};
</script>
