<style lang="less" scoped>
table.warehouse-list {
    tr {
        cursor: pointer;
    }
}
</style>

<template>
<div>
  <div class="col-md-12" v-if="!warehouses.length">
    There are no warehouses found. Please add warehouses or update the filters.
  </div>
  <crud-list :records="warehouses" :columns="['id', 'name']">
  </crud-list>
</div>
</template>

<script>
import CrudList from 'components/crud/list';

export default {
  components: {
    CrudList
  },

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
