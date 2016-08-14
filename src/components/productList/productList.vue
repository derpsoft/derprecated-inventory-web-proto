<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th>Version</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products">
        <td>{{product.id}}</td>
        <td>{{product.title}}</td>
        <td>{{product.createdAt}}</td>
        <td>{{product.updatedAt}}</td>
        <td>{{product.version}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

import Vue from 'vue';
const productList = Vue.component('product-list', {
  name: 'product-list',
  data() {
    return {
      products: [],
    };
  },
  ready() {
    const self = this;
    fetch('https://derprecated-inventory-api.azurewebsites.net/api/v1/products', {
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
