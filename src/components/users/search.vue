<template>
  <div class="form-group user-search">
    <input type="text" v-model="searchTerm" class="form-control" placeholder="Search for User..." autocomplete="no" tabindex="0" v-on:keyup="search">
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
      if (this.searchTerm.length === 0) {
        this.$store.dispatch(Constants.GET_USERS, {
          skip: 0,
          take: 25
        });
      } else {
        this.$store.dispatch(Constants.SEARCH_PRODUCTS, {
          query: this.searchTerm,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .user-search {
    margin-bottom: 30px;
  }

</style>
