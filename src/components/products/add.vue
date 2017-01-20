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

<style lang="less" scope>
  .panel-main {
      padding-top: 15px;
  }
  .tabs-container {
      margin-top: 20px;
  }
  textarea.form-control {
      resize: none;
      height: 152px;
  }
  .nav-tabs {
      margin-bottom: 0 !important;
  }
  .control-row {
      margin-bottom: 20px;
  }

  .tab-content {
      margin-top: 1px;
  }
  .tab-pane {
      padding: 10px 15px;
      background-color: rgba(68, 70, 79, 0.5);

      .panel {
          &:first-child {
              margin-top: 4px;
          }
          background-color: transparent;
          border: 1px solid rgba(116, 124, 158, 0.2);

          .panel-filled {
              background-color: transparent;
          }
          .panel-heading {
              background-color: transparent;
              font-weight: bold;
          }
          .panel-body {
              background-color: transparent;
          }
      }
  }
  a.thumbnail {
      border: 2px solid transparent;
      &:hover {
          border-color: #f6a821;
          transition: 300ms ease-in-out;
      }
  }
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
