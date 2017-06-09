<style lang="css" scoped>
</style>
<template>
  <div class="card">
    <div class="card-header">
      Add Products
      <div class="card-actions">
        <button class="btn btn-primary pull-right" @click="save">Create Product</button>
        <router-link class="btn btn-secondary btn-return" :to="{path: '/products'}">Back to Products</router-link>
      </div>
    </div>
    <div class="card-block">
      <product-form ref="productForm"></product-form>
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
