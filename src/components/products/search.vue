<template>
<form>
  <div class="form-group">
    <input class="form-control" type="text" v-model="searchTerm" placeholder="Search for a product" autocomplete="false">
  </div>
</form>
</template>
<script>
import Constants from '../../constants';

export default {
  name: 'productSearch',
  data() {
    return {
      searchTerm: '',
    };
  },

  watch: {
    searchTerm: 'search',
  },

  methods: {
    search() {
      this.$store.dispatch(Constants.SEARCH_PRODUCTS_WITH_TYPEAHEAD, {
        query: this.searchTerm,
      });
    },
  },
};
</script>
