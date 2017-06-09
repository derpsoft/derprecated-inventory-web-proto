<style lang="css" scoped>
table.warehouse-list {
    tr {
        cursor: pointer;
    }
}
</style>

<template>
<div>
  <div v-if="!warehouses.length">
    There are no warehouses found. Please add warehouses or update the filters.
  </div>
  <crud-list :records="warehouses" :columns="['id', 'name']" v-else>
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
    edit(id: number) {
      this.$router.push(`/warehouses/edit/${id}`);
    },
  },
};
</script>
