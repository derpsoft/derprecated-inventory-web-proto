<template>
<div>
  <div class="col-md-12">
    <log-search></log-search>
  </div>
  <div class="col-xs-6 text-left">
    <page-size :callback="setPageSize" :page-size="25"></page-size>
  </div>
  <div class="col-xs-6 text-right">
    <pagination :pagination="pagination" :callback="getPage"></pagination>
  </div>
  <div class="col-md-12">
    <div class="table-responsive">
      <table class="table table-striped table-hover log-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Unit of Measure ID</th>
            <th>User ID </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs">
            <td>{{log.id}}</td>
            <td>{{log.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
table.log-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import Pagination from 'vue-bootstrap-pagination';
import LogSearch from './search.vue';
import Constants from '../../constants';
import PageSize from '../pageSize/pageSize.vue';
import store from '../../stores/store';

const defaultPageCount = 25;

export default {
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
  components: {
    Pagination,
    PageSize,
    LogSearch,
  },
  mounted() {
    store.dispatch(Constants.GET_INVENTORY_TRANSACTION_LOGS, {
      skip: 0,
      take: defaultPageCount
    });
    store.dispatch(Constants.COUNT_INVENTORY_LOGS);
  },
  computed: {
    count() {
      return store.getters.logCount;
    },
    logs() {
      this.pagination.last_page = Math.ceil(this.count / this.pagination.per_page);
      this.pagination.to = this.count;

      return store.getters.logs;
    },
  },
  methods: {
    getPage() {
      const skip = this.pagination.per_page * (this.pagination.current_page - 1);
      store.dispatch(Constants.GET_INVENTORY_TRANSACTION_LOGS, {
        skip,
        take: this.pagination.per_page
      });
    },
    setPageSize(pageSize) {
      this.pagination.per_page = pageSize;
      this.pagination.current_page = 1;

      store.dispatch(Constants.GET_INVENTORY_TRANSACTION_LOGS, {
        skip: 0,
        take: pageSize,
      });
    },
  },
};
</script>
