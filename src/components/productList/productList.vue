<template>
<div class="table-responsive">
  <table class="table table-striped table-hover product-list">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" v-on:click="openProduct(product.id)">
        <td class="id">{{product.id}}</td>
        <td>
          <img v-if="product.images.length" :src="product.images[0].source" width="50" height="50">
          <img src="http://placehold.it/50x50" v-if="!product.images.length">
          {{product.title}}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style lang="less" scoped>
.product-list {
    td {
      vertical-align: middle;
    }
    tr {
        cursor: pointer;
    }
    td.id {
      padding-left: 15px;
      width: 25px;
    }
    img {
      margin-right: 20px;
    }
}
</style>

<script>
import Vue from 'vue';
import Constants from '../../constants';

const productList = Vue.component('product-list', {
  name: 'product-list',
  computed: {
    products() {
      return this.$store.state.products.list;
    }
  },
  methods: {
    openProduct(id) {
      this.$router.go(`/products/edit/${id}`);
    }
  },
  ready() {
    this.$store.dispatch(Constants.GET_PRODUCTS, {
      skip: 0,
      take: 200
    });
  },
});

export default productList;
</script>
