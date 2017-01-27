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
export default {
  computed: {
    warehouses() {
      const results = this.$store.getters.warehouseSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.warehouses;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/warehouses/edit/${id}`);
    },
  },
};
</script>
