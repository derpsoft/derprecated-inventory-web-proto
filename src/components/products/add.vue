<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Create Product</button>
      <h4>Product Details</h4>
    </div>
  </div>

  <product-form ref="productForm"></product-form>
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
  name: 'productsAdd',
  components: {
    tabs: tabset,
    tab,
    ProductForm,
  },
  data() {
    return {};
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/products'
      });
    },
    save() {
      this.$refs.productForm
        .validate()
        .then(({
          isValid,
          product
        }) => {
          if (isValid) {
            const redirect = this.redirect;

            this.$store.dispatch(Constants.CREATE_PRODUCT, {
              product,
              redirect
            });
          }
        });
    },
  },
};
</script>
