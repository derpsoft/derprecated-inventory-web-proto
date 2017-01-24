<template>
<div>
  <div v-if="products && products.length">
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
              <img v-if="product.images && product.images.length" :src="product.images[0].sourceUrl" width="50" height="50">
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
  </div>
  <div v-if="!products || products.length === 0">
    There are no products found. Please add products or update the filters.
  </div>
</div>
</template>

<style lang="less" scoped>
.product-list {
    td {
        vertical-align: middle;
        &.id {
            padding-left: 15px;
            width: 25px;
        }
    }
    tr {
        cursor: pointer;
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
  computed: {
    products() {
      const results = this.$store.getters.productSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.products;
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
