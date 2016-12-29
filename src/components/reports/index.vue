<style scoped lang="less">
.chart canvas {
    height: 500px !important;
}
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
      <div class="col-md-6">
        <div class="chart">
          <sales-by-total :labels="salesByTotal.labels" :data="salesByTotal.data"></sales-by-total>
        </div>
      </div>
        <!-- <div class="col-md-6">
          <div class="chart">
            <sales-by-product></sales-by-product>
          </div>
        </div> -->
    </div>
  </div>
</section>
</template>

<script>
import Constants from '../../constants';
import SalesByTotal from './salesByTotal.vue';
import SalesByProduct from './salesByProduct.vue';

export default {
  name: 'reportView',
  computed: {
    salesByTotal() {
      return this.$store.getters.salesByTotal;
    }
  },
  components: {
    SalesByTotal,
    SalesByProduct,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_SALES_BY_TOTAL, {
      groupBy: 'day'
    });
  }
};
</script>
