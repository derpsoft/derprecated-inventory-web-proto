<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
              <button class="btn btn-w-md btn-accent" v-link="{path: '/test'}">Add New Warehouse</button>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-world"></i>
          </div>
          <div class="header-title">
            <h3>Warehouses</h3>
            <small>Find all Inventory Locations</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
  export default {
  };
</script>
