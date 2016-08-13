<template>
  <section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled">
          <div class="panel-heading">
            <div class="panel-tools">
              <a class="panel-toggle"><i class="fa fa-chevron-up"></i></a>
              <a class="panel-close"><i class="fa fa-times"></i></a>
            </div>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <product-list></product-list>
            </div>
          </div>
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
