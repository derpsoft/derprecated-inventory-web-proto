<template>
  <div class="form-group category-search">
    <input type="text" v-model="searchTerm" class="form-control" placeholder="Search for Category..." autocomplete="no" tabindex="0" v-on:keyup="searchCategories">
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
  computed: {
  },
  methods: {
    searchCategories() {
      if (this.searchTerm.length) {
        this.$store.dispatch(Constants.SEARCH_CATEGORIES_WITH_TYPEAHEAD, {
          query: this.searchTerm,
        });
      } else {
        this.$store.dispatch(Constants.GET_CATEGORIES, {
          skip: 0,
          take: 200
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .category-search {
    margin-bottom: 30px;
  }
</style>
