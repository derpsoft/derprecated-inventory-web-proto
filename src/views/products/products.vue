<template>
  <section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
              <button class="btn btn-w-md btn-accent" v-link="{path: '/test'}">Add New Product</button>
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
        <div class="table-responsive">
          <product-list></product-list>
        </div>
      </div>
    </div>
  </div>
</section>
 </template>


<script>
import Vue from 'vue';
import productList from '../../components/productList/productList.vue';

const Inventory = Vue.extend({
  components: {
    productList,
  },
});

export default Inventory;
</script>
