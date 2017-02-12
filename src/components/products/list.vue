<style lang="css" scoped>
.product-list {
    td {
        vertical-align: middle;
        &.id {
            padding-left: 15px;
            width: 25px;
        }
    }
    img {
        margin-right: 20px;
    }
}
</style>

<template>
<div>
  <div v-if="!products.length">
    There are no products found. Please add products or update the filters.
  </div>

  <crud-list :records="products" :columns="['id', 'title', { name: 'quantityOnHand', displayName: 'Quantity' }, 'category', 'upc', 'sku']">
    <template slot="body-row" scope="props">
      <tr class="editable" v-on:click="edit(props.record.id)">
        <td class="id">{{props.record.id}}</td>
        <td>
          <img v-if="props.record.images && props.record.images.length" :src="props.record.images[0].sourceUrl | toSsl" width="50" height="50">
          <img src="https://placehold.it/50x50" v-if="!props.record.images || !props.record.images.length"> {{props.record.title}}
        </td>
        <td>{{props.record.quantityOnHand}}</td>
        <td>{{props.record.productType}}</td>
        <td>{{props.record.upc}}</td>
        <td>{{props.record.sku}}</td>
      </tr>
    </template>
  </crud-list>
</div>
</template>

<script>
import CrudList from 'components/crud/list';

export default {

  components: {
    CrudList
  },

  computed: {
    searchResults() {
      return this.$store.getters.productSearch;
    },
    list() {
      return this.$store.getters.products;
    },
    products() {
      if (this.searchResults.length) {
        return this.searchResults;
      }
      return this.list;
    },
  },

  filters: {
    toSsl(src) {
      return src.replace('http:', 'https:');
    },
  },

  methods: {
    edit(id) {
      this.$router.push(`/products/edit/${id}`);
    }
  },
};

</script>
