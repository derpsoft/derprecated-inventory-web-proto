<template>
<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products">
        <td>{{product.id}}</td>
        <td>{{product.title}}</td>
        <td>Edit</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

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
