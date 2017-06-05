<style lang="css" scoped>
.card-actions {
  .btn {
    padding: 0.8rem 1rem;
    width: auto;

    &:hover,
    &:active {
      color: #fff;
      background-color: #333;
    }

    .fa {
      margin-right: 0.5rem;
    }
  }
}
</style>
<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Products
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/products/import'}"><i class="fa fa-upload"></i>Bulk Import Products</router-link>
              <router-link class="btn" :to="{path: '/products/add'}"><i class="fa fa-plus"></i>Add New Product</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <product-list></product-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Constants from 'src/constants';
import Search from 'components/search';
import productList from './list';

export default {
  name: 'productIndex',
  data() {
    return {
      searchAction: Constants.SEARCH_PRODUCTS,
      listAction: Constants.GET_PRODUCTS,
      clearAction: Constants.CLEAR_PRODUCT_SEARCH,
    };
  },

  components: {
    productList,
    Search,
  },
};
</script>

