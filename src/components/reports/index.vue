<style scoped lang="css">
</style>

<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Reports
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/orders/add'}"><i class="fa fa-plus"></i>Add</router-link>
            </div>
          </div>
          <div class="card-block">
            <!--<sales-by-total :labels="salesByTotal.labels" :data="salesByTotal.data"></sales-by-total>-->
            <!--<sales-by-product :labels="salesByProduct.labels" :data="salesByProduct.data"></sales-by-product>-->
            <!--<sales-by-vendor :labels="salesByVendor.labels" :data="salesByVendor.data"></sales-by-vendor>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Constants from 'src/constants';
// import SalesByTotal from './salesByTotal';
// import SalesByProduct from './salesByProduct';
// import SalesByVendor from './salesByVendor';

export default {
  name: 'reportView',
  computed: {
 //   salesByProduct() {
 //     return this.$store.getters.salesByProduct;
 //   },
 //   salesByVendor() {
 //     return this.$store.getters.salesByVendor;
 //   },
 //   salesByTotal() {
 //     return this.$store.getters.salesByTotal;
 //   }
  },
  components: {
 //   SalesByTotal,
 //   SalesByProduct,
 //   SalesByVendor,
  },
  mounted() {
 //   this.$store.dispatch(Constants.GET_SALES_BY_TOTAL, {
 //     groupBy: 'week'
 //   });
 //   this.$store.dispatch(Constants.GET_SALES_BY_VENDOR, {
 //     groupBy: 'week',
 //     vendorId: 1,
 //   });
 //   this.$store.dispatch(Constants.GET_SALES_BY_PRODUCT, {
 //     groupBy: 'week',
 //     productId: 1,
 //   });
  }
};
</script>
