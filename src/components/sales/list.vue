<style lang="less" scoped>
table.sale-list {
    tr {
        cursor: pointer;
    }
}
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
            <tr @click.prevent="edit(sale.id)" v-for="sale in sales">
              <td>{{sale.id}}</td>
              <product-field tag="td" :id="sale.productId" field="title"></product-field>
              <user-field tag="td" :id="sale.userAuthId" field="userName"></user-field>
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
import saleSearch from './search.vue';
import Constants from '../../constants';
import ProductField from '../products/field.vue';
import UserField from '../users/field.vue';

export default {
  components: {
    saleSearch,
    ProductField,
    UserField,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_SALES, {
      skip: 0,
      take: 200,
    });
    this.$store.dispatch(Constants.COUNT_SALES);
  },
  computed: {
    count() {
      return this.$store.getters.saleCount;
    },
    sales() {
      return this.$store.getters.sales;
    },
  },

  filters: {
    formatTimestamp(date) {
      return moment(date).format('lll');
    },
  },

  methods: {
    edit(id) {
      this.$router.push(`/sales/edit/${id}`);
    },
  },
};
</script>
