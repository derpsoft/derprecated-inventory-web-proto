<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/vendors/add'}">Add New Vendor</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Vendors</h3>
            <small>Find all vendors</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <vendor-search></vendor-search>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <vendor-list></vendor-list>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import VendorList from './list.vue';
import VendorSearch from './search.vue';

export default {
  components: {
    VendorList,
    VendorSearch,
  },
};
</script>
