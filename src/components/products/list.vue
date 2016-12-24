<template>
<div class="table-responsive">
  <table class="table table-striped table-hover product-list">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Quantity</th>
        <th>Category</th>
        <th>UPC</th>
        <th>SKU</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" v-on:click="openProduct(product.id)">
        <td class="id">{{product.id}}</td>
        <td>
          <img v-if="product.images && product.images.length" :src="product.images[0].source" width="50" height="50">
          <img src="http://placehold.it/50x50" v-if="!product.images || !product.images.length"> {{product.title}}
        </td>
        <td>{{product.quantityOnHand}}</td>
        <td>{{product.productType}}</td>
        <td>{{product.upc}}</td>
        <td>{{product.sku}}</td>
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
import Constants from '../../constants';

export default {
  name: 'productList',
  data() {
    return {
      products: null,
    };
  },
  computed: {
    products() {
      return this.$store.getters.productList;
    },
  },
  methods: {
    openProduct(id) {
      this.$router.push(`/products/edit/${id}`);
    }
  },
  mounted() {
    this.$store.dispatch(Constants.GET_PRODUCTS, {
      skip: 0,
      take: 200
    });
  },
};
</script>
