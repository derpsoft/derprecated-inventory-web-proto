<template>
<div>
  <div class="col-md-12">
    <warehouse-search></warehouse-search>
  </div>
  <div class="col-xs-6 text-left">
    <page-size :callback="setPageSize" :page-size="25"></page-size>
  </div>
  <div class="col-xs-6 text-right">
    <pagination :pagination="pagination" :callback="getPage"></pagination>
  </div>
  <div class="col-md-12">
    <div class="table-responsive">
      <table class="table table-striped table-hover warehouse-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="warehouse in warehouses" @click.prevent="edit(warehouse.id)">
            <td>{{warehouse.id}}</td>
            <td>{{warehouse.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
table.warehouse-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import Pagination from 'vue-bootstrap-pagination';
import Constants from '../../constants';
import PageSize from '../../components/pageSize/pageSize.vue';
import warehouseSearch from './search.vue';
import store from '../../stores/store';

const defaultPageCount = 25;

export default {
  data() {
    return {
      count: null,
      warehouses: null,
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
    warehouseSearch,
  },
  created() {
    store.dispatch(Constants.GET_WAREHOUSES, {
      skip: 0,
      take: defaultPageCount
    });
  },
  computed: {
    warehouses() {
      this.pagination.last_page =
        Math.ceil(store.getters.warehouseList.count / this.pagination.per_page);
      this.pagination.to = store.getters.warehouseList.count;

      return store.getters.warehouseList;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/warehouses/edit/${id}`);
    },
    getPage() {
      const skip = this.pagination.per_page * (this.pagination.current_page - 1);
      store.dispatch(Constants.GET_WAREHOUSES, {
        skip,
        take: this.pagination.per_page
      });
    },
    setPageSize(pageSize) {
      this.pagination.per_page = pageSize;
      this.pagination.current_page = 1;

      this.$store.dispatch(Constants.GET_WAREHOUSES, {
        skip: 0,
        take: pageSize,
      });
    },
  },
};
</script>
