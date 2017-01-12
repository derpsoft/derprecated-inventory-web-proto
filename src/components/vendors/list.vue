<template>
<div>
  <div class="col-md-12">
    <vendor-search></vendor-search>
  </div>
  <div v-if="vendors && vendors.length">
    <div class="col-xs-6 text-left">
      <page-size :callback="setPageSize" :page-size="25"></page-size>
    </div>
    <div class="col-xs-6 text-right">
      <pagination :pagination="pagination" :callback="getPage"></pagination>
    </div>
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped table-hover vendor-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr @click.prevent="edit(vendor.id)" v-for="vendor in vendors">
              <td>{{vendor.id}}</td>
              <td>{{vendor.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-md-12" v-if="!vendors || vendors.length === 0">
    There were no vendors found. Please add vendors or update the filters.
  </div>
</div>
</template>

<style lang="less" scoped>
table.vendor-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import Pagination from 'vue-bootstrap-pagination';
import vendorSearch from './search.vue';
import Constants from '../../constants';
import PageSize from '../../components/pageSize/pageSize.vue';

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
    vendorSearch,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_VENDORS, {
      skip: 0,
      take: defaultPageCount
    });
    this.$store.dispatch(Constants.COUNT_VENDORS);
  },
  computed: {
    count() {
      return this.$store.getters.vendorCount;
    },
    vendors() {
      const vendors = this.$store.getters.vendors;

      this.pagination.last_page = Math.ceil(this.count / this.pagination.per_page);
      this.pagination.to = this.count;

      return vendors;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/vendors/edit/${id}`);
    },
    getPage() {
      const skip = this.pagination.per_page * (this.pagination.current_page - 1);
      this.$store.dispatch(Constants.GET_VENDORS, {
        skip,
        take: this.pagination.per_page
      });
    },
    setPageSize(pageSize) {
      this.pagination.per_page = pageSize;
      this.pagination.current_page = 1;

      this.$store.dispatch(Constants.GET_VENDORS, {
        skip: 0,
        take: pageSize,
      });
    },
  },
};
</script>
