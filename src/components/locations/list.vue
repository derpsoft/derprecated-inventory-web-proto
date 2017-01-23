<template>
<div>
  <div class="col-md-12">
    <location-search></location-search>
  </div>
  <div class="list-view" v-if="locations && locations.length">
    <div class="col-xs-6 text-left">
      <page-size :callback="setPageSize" :page-size="25"></page-size>
    </div>
    <div class="col-xs-6 text-right">
      <pagination :pagination="pagination" :callback="getPage"></pagination>
    </div>
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped table-hover location-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="location in locations" @click.prevent="edit(location.id)">
              <td>{{location.id}}</td>
              <td>{{location.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="!locations || !locations.length" class="col-md-12">
    There are no locations found. Please add locations or update the filters.
  </div>
</div>
</template>

<style lang="less" scoped>
table.location-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import Pagination from 'vue-bootstrap-pagination';
import Constants from '../../constants';
import PageSize from '../../components/pageSize/pageSize.vue';
import locationSearch from './search.vue';
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
    locationSearch,
  },
  mounted() {
    store.dispatch(Constants.GET_LOCATIONS, {
      skip: 0,
      take: defaultPageCount
    });
    store.dispatch(Constants.COUNT_LOCATIONS);
  },
  computed: {
    count() {
      return store.getters.locationCount;
    },
    locations() {
      this.pagination.last_page =
        Math.ceil(this.count / this.pagination.per_page);
      this.pagination.to = this.count;

      return store.getters.locationList;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/locations/edit/${id}`);
    },
    getPage() {
      const skip = this.pagination.per_page * (this.pagination.current_page - 1);
      store.dispatch(Constants.GET_LOCATIONS, {
        skip,
        take: this.pagination.per_page
      });
    },
    setPageSize(pageSize) {
      this.pagination.per_page = pageSize;
      this.pagination.current_page = 1;

      this.$store.dispatch(Constants.GET_LOCATIONS, {
        skip: 0,
        take: pageSize,
      });
    },
  },
};
</script>
