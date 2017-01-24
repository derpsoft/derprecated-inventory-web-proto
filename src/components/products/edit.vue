<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-danger pull-right" @click="remove" v-can-delete-products>Delete Product</button>
      <button class="btn btn-primary pull-right" type="submit" @click="save">Save Product</button>
      <h4>Product Details</h4>
    </div>
  </div>

  <product-form ref="productForm" :id="id"></product-form>
</div>
</template>

<script>
import {
  tabset,
  tab
} from 'vue-strap';
import Constants from '../../constants';
import ProductForm from './form.vue';

export default {
  name: 'productEdit',
  components: {
    tabs: tabset,
    tab,
    ProductForm
  },
  data() {
    return {
      displayImage: 'http://placehold.it/250x250',
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },

  methods: {
    save() {
      this.$refs.productForm
        .validate()
        .then(({
          isValid,
          product
        }) => {
          if (isValid) {
            product.id = this.id;
            this.$store.dispatch(Constants.SAVE_PRODUCT, {
              product
            });
          }
        });
    },
    remove() {
      this.$store.dispatch(Constants.DELETE_PRODUCT, this.id);
    },
  },
};
</script>
