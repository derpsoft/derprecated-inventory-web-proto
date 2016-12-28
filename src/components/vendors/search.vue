<template>
  <div class="form-group vendor-search">
    <input type="text" v-model="searchTerm" class="form-control" placeholder="Search for Vendor..." autocomplete="no" tabindex="0" v-on:keyup="search">
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
      if (!this.searchTerm.length) {
        this.$store.dispatch(Constants.GET_VENDORS, {
          skip: 0,
          take: 200
        });
      } else if (this.searchTerm.length < 2) {
        return;
      }

      this.$store.dispatch(Constants.SEARCH_VENDORS_WITH_TYPEAHEAD, {
        query: this.searchTerm,
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .vendor-search {
    margin-bottom: 30px;
  }

</style>
