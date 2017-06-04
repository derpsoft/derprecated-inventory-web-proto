<template>
  <main class="main">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">Home</li>
    <li class="breadcrumb-item"><a href="#">Inventory</a>
    </li>
  </ol>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-warning" :to="{path: '/products/import'}">Bulk Import Products</router-link>
            <router-link class="btn btn-primary" :to="{path: '/products/add'}">Add New Product</router-link>
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
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <product-list></product-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
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

<style scoped>
.add-control {
  margin-right: -15px;
}
</style>
