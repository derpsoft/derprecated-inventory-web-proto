<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Create Product</button>
      <h4>Product Details</h4>
    </div>
  </div>

  <product-form :product="product" @change="setProduct" @is-valid="setValid"></product-form>
</div>
</template>

<style lang="less" scoped>
</style>

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
    return {
      product: {},
      isValid: false,
    };
  },
  methods: {
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
    redirect() {
      this.$router.push({ path: '/products' });
    },
    save() {
      if (this.isValid) {
        const product = JSON.parse(JSON.stringify(this.product));
        const redirect = this.redirect;

        this.$store.dispatch(Constants.CREATE_PRODUCT, {
          product,
          redirect
        });
      }
    },
    setProduct(v) {
      this.product = Object.assign({}, this.product, v);
    },
    setValid(flag) {
      this.isValid = flag;
    },
  },
};
</script>
