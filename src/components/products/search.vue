<template>
  <form>
    <div class="form-group">
      <input class="form-control" type="text" v-model="searchTerm" placeholder="Search for a product" autocomplete="false" v-on:keyup="searchProducts">
    </div>
  </form>
</template>
<script>
  import Constants from '../../constants';

  export default {
    name: 'productSearch',
    data() {
      return {
        searchTerm: null,
      };
    },
    methods: {
      searchProducts() {
        if (this.searchTerm.length === 0) {
          this.$store.dispatch(Constants.SEARCH_PRODUCTS, {
            query: '',
          });
        } else if (this.searchTerm.length < 2) {
          return;
        }

        this.$store.dispatch(Constants.SEARCH_PRODUCTS, {
          query: this.searchTerm,
        });
      },
    },
  };
</script>
