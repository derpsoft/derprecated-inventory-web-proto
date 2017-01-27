<template>
<div>
  <div class="col-md-12" v-if="!warehouses.length">
    There are no warehouses found. Please add warehouses or update the filters.
  </div>
  <div>
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
import Constants from '../../constants';
import warehouseSearch from './search.vue';

export default {
  components: {
    warehouseSearch,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_WAREHOUSES, {
      skip: 0,
      take: 200,
    });
    this.$store.dispatch(Constants.COUNT_WAREHOUSES);
  },
  computed: {
    count() {
      return this.$store.getters.warehouseCount;
    },
    warehouses() {
      return this.$store.getters.warehouseList;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/warehouses/edit/${id}`);
    },
  },
};
</script>
