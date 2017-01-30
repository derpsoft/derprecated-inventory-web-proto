<style lang="less" scoped>
</style>

<template>
<div>
  <div class="col-md-12" v-if="!sales.length">
    There were no sales found. Please add sales or update the filters.
  </div>
  <div v-if="sales.length">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped table-hover sale-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>User</th>
              <th>Vendor</th>
              <th>Total</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in sales">
              <td>{{sale.id}}</td>
              <product-field tag="td" :id="sale.productId" field="title" :defaultValue="sale.productId"></product-field>
              <user-field tag="td" :id="sale.userAuthId" field="userName" :defaultValue="sale.userAuthId"></user-field>
              <td>{{sale.vendorId}}</td>
              <td>${{sale.total}}</td>
              <td>{{sale.timestamp | formatTimestamp}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import ProductField from '../products/field.vue';
import UserField from '../users/field.vue';

export default {
  components: {
    ProductField,
    UserField,
  },
  computed: {
    sales() {
      const results = this.$store.getters.saleSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.sales;
    },
  },

  filters: {
    formatTimestamp(date) {
      return moment(date).format('lll');
    },
  },
};
</script>
