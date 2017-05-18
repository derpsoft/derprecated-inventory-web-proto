<template>
<div>
  <div class="col-md-12" v-if="!categories.length">
    There were no categories found. Please add categories or update the filters.
  </div>
  <crud-list :records="categories" :columns="['id', 'name']"></crud-list>
</div>
</template>

<script>
// @flow
import CrudList from 'components/crud/list';

export default {
  components: {
    CrudList
  },

  computed: {
    categories() {
      const results = this.$store.getters.categorySearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.categories;
    },
  },
};
</script>
