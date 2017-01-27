<style lang="less" scoped>
table.sale-list {
    tr {
        cursor: pointer;
    }
}
</style>

<template>
<div>
  <div class="col-md-12">
    <sale-search></sale-search>
  </div>
  <div v-if="sales && sales.length">
    <div class="col-xs-6 text-left">
      <page-size :callback="setPageSize" :page-size="25"></page-size>
    </div>
    <div class="col-xs-6 text-right">
      <pagination :pagination="pagination" :callback="getPage"></pagination>
    </div>
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
  <div class="col-md-12" v-if="!sales || sales.length === 0">
    There were no sales found. Please add sales or update the filters.
  </div>
</div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import Pagination from 'vue-bootstrap-pagination';
import saleSearch from './search.vue';
import Constants from '../../constants';
import PageSize from '../../components/pageSize/pageSize.vue';
import ProductField from '../products/field.vue';
import UserField from '../users/field.vue';

const defaultPageCount = 25;

export default {
  components: {
    Pagination,
    PageSize,
    saleSearch,
    ProductField,
    UserField,
  },
  data() {
    return {
      pagination: {
        per_page: defaultPageCount,
        current_page: 1,
        last_page: 1,
        to: 0,
      },
    };
  },
  mounted() {
    this.$store.dispatch(Constants.GET_SALES, {
      skip: 0,
      take: defaultPageCount
    });
    this.$store.dispatch(Constants.COUNT_SALES);
  },
  computed: {
    count() {
      return this.$store.getters.saleCount;
    },
    sales() {
      const sales = this.$store.getters.sales;

      this.pagination.last_page = Math.ceil(this.count / this.pagination.per_page);
      this.pagination.to = this.count;

      return sales;
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
    getPage() {
      const skip = this.pagination.per_page * (this.pagination.current_page - 1);
      this.$store.dispatch(Constants.GET_SALES, {
        skip,
        take: this.pagination.per_page
      });
    },
    setPageSize(pageSize) {
      this.pagination.per_page = pageSize;
      this.pagination.current_page = 1;

      this.$store.dispatch(Constants.GET_SALES, {
        skip: 0,
        take: pageSize,
      });
    },
    getProduct(id) {
      return _.merge({
        name: '',
      }, this.$store.getters.product(id));
    },
    getUser(id) {
      return _.merge({
        name: '',
      }, this.$store.getters.user(id));
    },
  },
};
</script>
