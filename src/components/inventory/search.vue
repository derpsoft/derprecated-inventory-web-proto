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
      if (this.searchTerm.length) {
        this.$store.dispatch(Constants.SEARCH_INVENTORY_TRANSACTION_LOGS, {
          query: this.searchTerm
        });
      } else {
        this.$store.dispatch(Constants.GET_INVENTORY_TRANSACTION_LOGS, {
          skip: 0,
          take: 25,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .inventory-search {
    margin-bottom: 30px;
  }

</style>
