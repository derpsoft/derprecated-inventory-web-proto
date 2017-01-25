<style lang="less" scoped>
.sale-search {
  margin-bottom: 30px;
}
</style>

<template>
<div class="form-group sale-search">
  <input type="text" v-model="searchTerm" class="form-control" placeholder="Search for Sale..." autocomplete="no" tabindex="0" v-on:keyup="searchSales">
</div>
</template>

<script>
import Constants from '../../constants';

export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  computed: {},
  methods: {
    searchSales() {
      if (this.searchTerm.length) {
        this.$store.dispatch(Constants.SEARCH_SALES_WITH_TYPEAHEAD, {
          query: this.searchTerm,
        });
      } else {
        this.$store.dispatch(Constants.GET_SALES, {
          skip: 0,
          take: 200
        });
      }
    },
  },
};
</script>
