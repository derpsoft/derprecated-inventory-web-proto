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
import API_URL from '../../constants/constants.js';

const productList = Vue.component('product-list', {
  name: 'product-list',
  data() {
    return {
      products: [],
    };
  },
  methods: {
    openProduct(id) {
      this.$router.go(`/products/edit/${id}`);
    },
  },
  ready() {
    const self = this;
    fetch(`${API_URL}products`, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-10',
      },
    }).then(res => res.json())
    .then((response) => {
      self.products = response.products;
    });
  },
});

export default productList;

</script>
