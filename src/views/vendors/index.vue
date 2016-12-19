<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
              <button class="btn btn-w-md btn-accent" v-link="{path: './add'}">Add New Vendor</button>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-vendors"></i>
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
        <vendor-list></vendor-list>
      </div>
    </div>
  </div>
</section>
</template>

<script>
  import VendorList from '../../components/vendors/list.vue';

  export default {
    data() {
      return {};
    },
    components: {
      VendorList,
    },
  };
</script>
