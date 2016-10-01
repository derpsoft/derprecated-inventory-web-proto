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
        <td>{{product.id}}</td>
        <td>{{product.title}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style lang="less" scoped>
.product-list {
    tr {
        cursor: pointer;
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
