<style lang="css" scoped>
</style>

<template>
<div>
  <div v-if="!vendors.length">
    There were no vendors found. Please add vendors or update the filters.
  </div>
  <crud-list :records="vendors" :columns="['id', 'name']" v-else>
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
    vendors() {
      const results = this.$store.getters.vendorSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.vendors;
    },
  },
};

</script>
