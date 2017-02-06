<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Create Product</button>
      <h4>Product Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <product-form ref="productForm"></product-form>
    </div>
  </div>
</div>
</template>

<script>
import Constants from 'src/constants';
import ProductForm from './form';

export default {
  name: 'productsAdd',
  components: {
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
