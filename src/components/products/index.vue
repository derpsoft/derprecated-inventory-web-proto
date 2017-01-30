<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent add-control" :to="{path: '/products/add'}">Add New Product</router-link>
          </div>
          <div class="header-icon">
            <i class="pe  page-header-icon pe-7s-search"></i>
          </div>
          <div class="header-title">
            <h3>Product Search</h3>
            <small>Inventory Search - Search for All Products</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled panel-main">
          <div class="panel-body">
            <search :searchActionName="searchAction" :listActionName="listAction"></search>
            <product-list></product-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>


<script>
import productList from './list.vue';
import Search from '../search.vue';
import Constants from '../../constants';

export default {
  data() {
    return {
      searchAction: Constants.SEARCH_PRODUCTS_WITH_TYPEAHEAD,
      listAction: Constants.GET_PRODUCTS,
    };
  },

  components: {
    productList,
    Search,
  },
};
</script>

<style scoped>
.add-control {
  margin-right: -15px;
}
</style>
