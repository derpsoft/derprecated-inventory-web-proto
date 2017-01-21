<template>
<div>
  <div class="col-md-12">
    <warehouse-search></warehouse-search>
  </div>
  <div v-if="warehouses && warehouses.length">
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
  <div class="col-md-12" v-if="!warehouses || warehouses.length === 0">
    There are no warehouses found. Please add warehouses or update the filters.
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
  mounted() {
    store.dispatch(Constants.GET_WAREHOUSES, {
      skip: 0,
      take: defaultPageCount
    });
    store.dispatch(Constants.COUNT_WAREHOUSES);
  },
  computed: {
    count() {
      return store.getters.warehouseCount;
    },
    warehouses() {
      this.pagination.last_page =
        Math.ceil(this.count / this.pagination.per_page);
      this.pagination.to = this.count;

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
