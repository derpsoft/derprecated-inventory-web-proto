<style scoped lang="less">
</style>

<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-note2"></i>
          </div>
          <div class="header-title">
            <h3>Reports</h3>
            <small>View Reports</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="panel">
          <div class="panel-body">
            <sales-by-total :labels="salesByTotal.labels" :data="salesByTotal.data"></sales-by-total>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel">
          <div class="panel-body">
            <sales-by-product :labels="salesByProduct.labels" :data="salesByProduct.data"></sales-by-product>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel">
          <div class="panel-body">
            <sales-by-vendor :labels="salesByVendor.labels" :data="salesByVendor.data"></sales-by-vendor>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import Constants from '../../constants';
import SalesByTotal from './salesByTotal.vue';
import SalesByProduct from './salesByProduct.vue';
import SalesByVendor from './salesByVendor.vue';

export default {
  name: 'reportView',
  computed: {
    salesByProduct() {
      return this.$store.getters.salesByProduct;
    },
    salesByVendor() {
      return this.$store.getters.salesByVendor;
    },
    salesByTotal() {
      return this.$store.getters.salesByTotal;
    }
  },
  components: {
    SalesByTotal,
    SalesByProduct,
    SalesByVendor,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_SALES_BY_TOTAL, {
      groupBy: 'week'
    });
    this.$store.dispatch(Constants.GET_SALES_BY_VENDOR, {
      groupBy: 'week',
      vendorId: 1,
    });
    this.$store.dispatch(Constants.GET_SALES_BY_PRODUCT, {
      groupBy: 'week',
      productId: 1,
    });
  }
};
</script>
