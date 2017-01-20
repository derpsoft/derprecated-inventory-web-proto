<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" type="submit" @click="save">Save Product</button>
      <h4>Product Details</h4>
    </div>
  </div>

  <product-form :product="product" @change="setProduct" @is-valid="setValid"></product-form>
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
      product: {},
      displayImage: 'http://placehold.it/250x250',
      isValid: false,
    };
  },
  computed: {
    vendors() {
      return this.$store.getters.vendors;
    },
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  methods: {
    load() {
      this.$store.dispatch(Constants.GET_PRODUCT, {
        id: this.id,
      });
    },
    save() {
      if (this.isValid) {
        const product = JSON.parse(JSON.stringify(this.product));
        product.id = this.id;
        this.$store.dispatch(Constants.SAVE_PRODUCT, {
          product
        });
      }
    },
    updateImage(img) {
      this.displayImage = img;
    },
    setProduct(v) {
      this.product = Object.assign({}, this.product, v);
    },
    setValid(flag) {
      this.isValid = flag;
    },
  },
  mounted() {
    this.$store.watch(
      () => this.$store.getters.product,
      (current) => {
        this.product = Object.assign({}, current);
        // if (this.product.images && this.product.images[0] && this.product.images[0].source) {
        //   this.displayImage = this.product.images[0].source;
        // }
      }
    );
    this.load();
  }
};
</script>
