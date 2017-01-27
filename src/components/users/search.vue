<template>
<div class="form-group user-search">
  <input type="text" v-model="searchTerm" class="form-control" placeholder="Search for User..." autocomplete="no" tabindex="0">
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

  watch: {
    searchTerm: 'search',
  },

  methods: {
    search() {
      this.$store.dispatch(Constants.SEARCH_USERS_WITH_TYPEAHEAD, {
        query: this.searchTerm,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user-search {
    margin-bottom: 30px;
}
</style>
