<template>
  <div class="form-group inventory-search">
    <input type="text" v-model="searchTerm" class="form-control" placeholder="Search for Inventory..." autocomplete="no" tabindex="0" v-on:keyup="search">
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
    search() {
      this.$store.dispatch(Constants.SEARCH_INVENTORY_TRANSACTION_LOGS, {
        query: this.searchTerm
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .inventory-search {
    margin-bottom: 30px;
  }

</style>
